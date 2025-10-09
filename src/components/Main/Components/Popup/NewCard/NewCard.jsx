import { useState } from "react";

export default function NewCard({ onAddCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({ name, link });
    setName("");
    setLink("");
  }

  return (
    <form
      id="formNewCard"
      className="popup__form"
      noValidate
      onSubmit={handleSubmit}
    >
       <h3 className="popup__title">Novo Local</h3>
      <input
        type="text"
        name="name"
        id="inputTitle"
        className="popup__input"
        placeholder="Título"
        required
        minLength={1}
        maxLength={30}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="error-msg" id="inputTitle-error"></span>

      <input
        type="url"
        name="link"
        id="inputLink"
        className="popup__input"
        placeholder="URL da imagem"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="error-msg" id="inputLink-error"></span>

      <button type="submit" className="popup__save">
        Crie
      </button>
    </form>
  );
}
