import logo from "../../images/logo_vector.png";

function Header() {
  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />
      
       <hr className="header__line" />
    </header>
  );
}

export default Header;