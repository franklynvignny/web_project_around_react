import { useContext } from "react";
import Card from "./Components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Popup from "./Components/Popup/Popup.jsx";
import EditProfile from "./Components/Popup/EditProfile/EditProfile.jsx";
import ImagePopup from "./Components/Popup/ImagePopup/ImagePopup.jsx";
import EditAvatar from "./Components/Popup/EditAvatar/EditAvatar.jsx";
import NewCard from "./Components/Popup/NewCard/NewCard.jsx";

export default function Main({
  cards,
  onOpenPopup,
  onCardClick,
  onCardLike,
  onCardDelete,
  onAddCard,
  popup,
  onClosePopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="profile__avatar"
          />
          <button
            className="profile__avatar-edit"
            aria-label="Editar avatar"
            onClick={() => onOpenPopup("editAvatar")}
          />
        </div>

        <div className="profile__info">
          <div className="profile__top">
            <h2 className="profile__user">{currentUser?.name || "Usuário"}</h2>
            <button
              className="profile__edit"
              onClick={() => onOpenPopup("editProfile")}
              aria-label="Editar perfil"
            />
          </div>
          <p className="profile__about">{currentUser?.about || "Sobre mim"}</p>
        </div>

        <button
          className="profile__add-button"
          onClick={() => onOpenPopup("newCard")}
          aria-label="Adicionar novo card"
        />
      </section>

      <section className="elements">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup.isOpen && (
        <Popup isOpen={popup.isOpen} onClose={onClosePopup}>
          {popup.type === "editProfile" && (
            <EditProfile onClose={onClosePopup} />
          )}
          {popup.type === "editAvatar" && <EditAvatar onClose={onClosePopup} />}
          {popup.type === "newCard" && (
            <NewCard onClose={onClosePopup} onAddCard={onAddCard} />
          )}
          {popup.type === "imagePreview" && (
            <ImagePopup card={popup.data} onClose={onClosePopup} />
          )}
        </Popup>
      )}
    </main>
  );
}
