import { useContext } from "react";
import Card from "./Components/Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Popup from "./Components/Popup/Popup.jsx"

export default function Main({
  cards,
  onOpenPopup,
  onCardClick,
  onCardLike,
  onCardDelete,
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
       {false && <Popup />}
    </main>
  );
}
