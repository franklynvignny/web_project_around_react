import { useState } from "react";
import Popup from "./Components/Popup/Popup";
import NewCardForm from "./Components/Popup/Components/NewCard/NewCard.jsx";
import EditProfileForm from "./Components/Popup/Components/EditProfile/EditProfile.jsx";
import EditAvatarForm from "./Components/Popup/Components/EditAvatar/EditAvatar.jsx";
import Card from "./Components/Card/Card.jsx";
import ImagePopup from "./Components/Popup/Components/ImagePopup/ImagePopup.jsx";

import EditProfileIcon from "../../images/Edit_Button.png";
import NewCardIcon from "../../images/add_mais.png";
import Avatar from "../../images/Avatar.png";

const cardsData = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const popups = {
    newCard: { title: "Novo cartão", children: <NewCardForm /> },
    editProfile: { title: "Editar perfil", children: <EditProfileForm /> },
    editAvatar: {
      title: "Alterar a foto do perfil",
      children: <EditAvatarForm />,
    },
  };

  // Abre popup de formulário
  function handleOpenPopup(popupKey) {
    setPopup(popups[popupKey]);
  }

  // Fecha popup
  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
  }

  // Abre popup de imagem
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={Avatar} alt="foto de perfil" className="profile__avatar" />
          <button
            type="button"
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup("editAvatar")}
          />
        </div>

        <div className="profile__info">
          <div className="profile__top">
            <h2 className="profile__user">Jacques Cousteau</h2>
            <button
              type="button"
              className="profile__edit"
              onClick={() => handleOpenPopup("editProfile")}
            >
              <img src={EditProfileIcon} alt="Editar perfil" />
            </button>
          </div>
          <p className="profile__about">Explorador</p>
        </div>

        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup("newCard")}
        >
          <img src={NewCardIcon} alt="Novo post" />
        </button>
      </section>

      {/* Seção Cards */}
      <section className="elements">
        <ul className="cards__list">
          {cardsData.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {/* Popup de imagem */}
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleClosePopup} />
      )}
    </main>
  );
}
