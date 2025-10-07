import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Preenche os campos com os dados do usuário quando ele muda
  useEffect(() => {
    setName(currentUser?.name || "");
    setAbout(currentUser?.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <form
      id="formEditProfile"
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="inputName"
        className="popup__input"
        placeholder="Nome"
        required
        minLength={1}
        maxLength={30}
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="error-msg" id="inputAbout-error"></span>

      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
