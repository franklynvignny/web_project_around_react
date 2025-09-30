import { useState } from "react";


export default function NewCard({ onAddPlaceSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name: title, link });
    setTitle("");
    setLink("");
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__save" type="submit">
        Salvar
      </button>
    </form>
  );
}
