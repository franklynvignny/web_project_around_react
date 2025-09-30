import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = ""; 
  }

  return (
    <form id="formEditAvatar" className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        name="avatar"
        id="inputAvatarLink"
        className="popup__input"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
        ref={avatarRef}
      />
      <span className="error-msg" id="inputAvatarLink-error"></span>
      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
