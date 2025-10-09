import CloseIcon from "../../../../../images/closeIcon.png";

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__inner popup__inner_type_confirm">
        <button
          aria-label="Fechar"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Fechar" />
        </button>

        <p className="popup__text">Tem certeza?</p>

        <div className="popup__buttons">
          <button
            className="popup__button popup__button_confirm"
            onClick={onConfirm}
          >
            Sim
          </button>
          
        </div>
      </div>
    </div>
  );
}
