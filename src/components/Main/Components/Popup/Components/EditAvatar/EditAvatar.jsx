export default function EditAvatar() {
  return (
    <form id="formEditAvatar" className="popup__form" noValidate>
      <input
        type="url"
        name="avatar"
        id="inputAvatarLink"
        className="popup__input"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
      />
      <span className="error-msg" id="inputAvatarLink-error"></span>
      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
