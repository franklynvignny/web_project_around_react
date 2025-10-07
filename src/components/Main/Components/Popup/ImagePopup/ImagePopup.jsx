
import CloseIcon from "../../../../../images/closeIcon.png";

export default function ImagePopup({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          aria-label="Fechar imagem"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Fechar" />
        </button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
