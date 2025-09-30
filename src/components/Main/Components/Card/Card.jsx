import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import deleteIcon from "../../../../images/apagar.png";
import likeActive from "../../../../images/like_active.png";
import likeInactive from "../../../../images/like.png";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);


  const isLiked = Array.isArray(card.likes)
    ? card.likes.some((i) => i._id === currentUser?._id)
    : false;

  const isOwn = card.owner === currentUser?._id;

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />

      {isOwn && (
        <button
          className="card__delete-button"
          onClick={() => onCardDelete(card)}
          aria-label="Deletar card"
        >
          <img src={deleteIcon} alt="Deletar" />
        </button>
      )}

      <div className="card__info">
        <h3 className="card__title">{card.name}</h3>
        <button
          className="card__like-button"
          onClick={() => onCardLike(card)}
          aria-label="Curtir card"
        >
          <img
            src={isLiked ? likeActive : likeInactive}
            alt="Curtir"
            className="card__like-icon"
          />
        </button>
      </div>
    </li>
  );
}
