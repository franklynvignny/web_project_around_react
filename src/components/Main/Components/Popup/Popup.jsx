import CloseIcon from "../../../../images/closeIcon.png";

export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup popup_opened">
      <div
        className={`popup__inner ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img src={CloseIcon} alt="Fechar" />
        </button>

        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
