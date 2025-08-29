export default function EditProfile() {
  return (
    <form id="formEditProfile" className="popup__form" noValidate>
      <input
        type="text"
        name="name"
        id="inputName"
        className="popup__input"
        placeholder="Nome"
        required
        minLength={1}
        maxLength={30}
      />
      <span className="error-msg" id="inputName-error"></span>

      <input
        type="text"
        name="about"
        id="inputAbout"
        className="popup__input"
        placeholder="Sobre você"
        required
        minLength={1}
        maxLength={30}
      />
      <span className="error-msg" id="inputAbout-error"></span>

      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
