export default function Card({ card, handleCardClick }) {
  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => handleCardClick(card)}
      />
      <button type="button" className="card__delete-button" />
      <div className="card__info">
        <h3 className="card__title">{card.name}</h3>
        <button type="button" className="card__like-button" />
      </div>
    </li>
  );
}
