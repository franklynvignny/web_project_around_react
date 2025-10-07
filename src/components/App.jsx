import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import Popup from "./Main/Components/Popup/Popup.jsx";
import EditProfile from "./Main/Components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./Main/Components/Popup/NewCard/NewCard.jsx";
import NewCard from "./Main/Components/Popup/NewCard/NewCard.jsx";
import RemoveCard from "./Main/Components/Popup/RemoveCard/RemoveCard.jsx";
import ImagePopup from "./Main/Components/Popup/ImagePopup/ImagePopup.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  
  // 🔹 Carregar usuário e cards
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    
      .then(([user, initialCards]) => {
        setCurrentUser(user);

        const normalizedCards = initialCards.map((c) => ({
          ...c,
          likes: Array.isArray(c.likes)
            ? c.likes.map((l) => (typeof l === "string" ? { _id: l } : l))
            : [],
          owner: typeof c.owner === "string" ? { _id: c.owner } : c.owner,
        }));

        setCards(normalizedCards);
      })
      .catch(console.error);
  }, []);

  // 🔹 Funções de popups
  const handleOpenPopup = (popupKey) => setPopup(popupKey);
  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsImagePopupOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  // 🔹 Curtir / descurtir
  const handleCardLike = async (card) => {
    // A lição mostra que devemos usar card.isLiked
    const isLiked = card.isLiked;

    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);

      // Atualizar o estado diretamente como na lição
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
    } catch (err) {
      console.error("Erro ao curtir/descurtir:", err);
    }
  };

  // 🔹 Deletar card
  const handleAskDeleteCard = (card) => setCardToDelete(card);
  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => setCards((state) => state.filter((c) => c._id !== cardId)))
      .catch(console.error)
      .finally(() => setCardToDelete(null));
  };

  // 🔹 Adicionar card
  const handleAddCard = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        const normalizedCard = {
          ...newCard,
          likes: Array.isArray(newCard.likes)
            ? newCard.likes.map((l) => (typeof l === "string" ? { _id: l } : l))
            : [],
          owner:
            typeof newCard.owner === "string"
              ? { _id: newCard.owner }
              : newCard.owner,
        };
        setCards((prev) => [normalizedCard, ...prev]);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // 🔹 Atualizar usuário
  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // 🔹 Atualizar avatar
  const handleUpdateAvatar = (avatarData) => {
    api
      .updateUserAvatar(avatarData.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onOpenPopup={handleOpenPopup}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleAskDeleteCard}
        />
        <Footer />

        {popup === "editProfile" && (
          <Popup title="Editar perfil" onClose={handleClosePopup}>
            <EditProfile onUpdateUser={handleUpdateUser} />
          </Popup>
        )}
        {popup === "editAvatar" && (
          <Popup title="Editar avatar" onClose={handleClosePopup}>
            <EditAvatar onUpdateAvatar={handleUpdateAvatar} />
          </Popup>
        )}
        {popup === "newCard" && (
          <Popup title="Novo Card" onClose={handleClosePopup}>
            <NewCard onAddCard={handleAddCard} />
          </Popup>
        )}
        {cardToDelete && (
          <Popup onClose={handleClosePopup}>
            <RemoveCard
              card={cardToDelete}
              onCardDelete={() => handleCardDelete(cardToDelete._id)}
              onClose={handleClosePopup}
            />
          </Popup>
        )}
        {isImagePopupOpen && selectedCard && (
          <ImagePopup card={selectedCard} onClose={handleClosePopup} />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
