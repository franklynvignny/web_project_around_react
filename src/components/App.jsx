import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

import Popup from "./Main/Components/Popup/Popup.jsx";
import EditProfile from "../components/Main/Components/Popup/Components/EditProfile/EditProfile.jsx";
import EditAvatar from "../components/Main/Components/Popup/Components/EditAvatar/EditAvatar.jsx";
import NewCard from "./Main/Components/Popup/Components/NewCard/NewCard.jsx";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  // buscar user info + cards iniciais
  useEffect(() => {
  console.log('useEffect executado - buscando dados...');
  
  api.getUserInfo()
    .then((user) => {
      console.log('Usuário recebido:', user);
      setCurrentUser(user);
    })
    .catch((error) => {
      console.error('Erro ao buscar usuário:', error);
    });

  api.getInitialCards()
    .then((cards) => {
      console.log('Cards recebidos:', cards);
      setCards(cards);
    })
    .catch((error) => {
      console.error('Erro ao buscar cards:', error);
    });
}, []);

  // abrir/fechar popups
  const handleOpenPopup = (popupKey) => setPopup(popupKey);
  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
  };

  // abrir imagem
  const handleCardClick = (card) => setSelectedCard(card);

  // like/unlike
  const handleCardLike = (card) => {
    const isLiked = Array.isArray(card.likes)
      ? card.likes.some((i) => i._id === currentUser?._id)
      : false;

    const likePromise = isLiked
      ? api.removeLike(card._id)
      : api.addLike(card._id);

    likePromise
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch(console.error);
  };

  // Função para mostrar o popup de confirmação
const handleCardDeleteClick = (card) => {
  setCardToDelete(card); // Abre o popup com o card a ser deletado
};

// Sua função atual (mantém como está, mas modifica um pouco) 
  const handleCardDelete = (card) => {
  console.log('Card a ser deletado:', card);
  console.log('ID do card:', card._id);
  
  api.deleteCard(card._id) // ← Usar card._id
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id)); // ← Usar card._id
      setCardToDelete(null);
    })
    .catch(console.error);
};


  // atualizar perfil
  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // atualizar avatar
  const handleUpdateAvatar = (avatarData) => {
    api.updateUserAvatar(avatarData)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // adicionar card
  const handleAddCard = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]); // ✅ forma segura
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
          onCardDelete={handleCardDelete}
        />
        <Footer />

        {/* Popups */}
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

        {/* Popup de imagem */}
        {selectedCard && (
          <Popup title={selectedCard.name} onClose={handleClosePopup}>
            <img
              src={selectedCard.link}
              alt={selectedCard.name}
              className="popup__image"
            />
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
