import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import Popup from "./Main/Components/Popup/Popup.jsx";
import ConfirmDeletePopup from "./Main/Components/Popup/ConfirmDeletePopup/ConfirmDeletePopup.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState({
    isOpen: false,
    type: "",
    data: null,
  });
  const [cardToDelete, setCardToDelete] = useState(null);

  // carregar usuário e cards
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

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClosePopup();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  // popups
  function onOpenPopup(type, data = null) {
    setPopup({
      isOpen: true,
      type,
      data,
    });
  }

  function onClosePopup() {
    setPopup({
      isOpen: false,
      type: "",
      data: null,
    });
  }

  const handleCardClick = (card) => {
    onOpenPopup("imagePreview", card);
  };

  const handleCardLike = async (card) => {
    const isLiked = card.isLiked;
    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
    } catch (err) {
      console.error("Erro ao curtir/descurtir:", err);
    }
  };

  // **confirmar antes de deletar**
  const handleAskDeleteCard = (card) => setCardToDelete(card);

  // deleta realmente (recebe o card inteiro)
  const handleCardDelete = (card) => {
    const cardId = card._id;
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch(console.error)
      .finally(() => setCardToDelete(null));
  };

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
        onClosePopup();
      })
      .catch(console.error);
  };

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClosePopup();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .updateUserAvatar(avatarData.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClosePopup();
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
          onOpenPopup={onOpenPopup}
          onClosePopup={onClosePopup}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleAskDeleteCard}
          onAddCard={handleAddCard}
          popup={popup}
        />
        <Footer />

        {cardToDelete && (
          <ConfirmDeletePopup
            isOpen={!!cardToDelete}
            onClose={() => setCardToDelete(null)}
            onConfirm={() => handleCardDelete(cardToDelete)}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
