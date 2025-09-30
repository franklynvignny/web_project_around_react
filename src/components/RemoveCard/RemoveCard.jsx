import { useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function RemoveCard({ card, onCardDelete, onClose }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card._id);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <h3 className="popup__title">Tem certeza?</h3>
      <button className="button popup__button" type="submit">
        Sim
      </button>
    </form>
  );
}