import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="header header_background">
      <div className="header__container">
        <div className="header__logo">
          <img className="header__logo-img" src={logo} alt="Логотип" />
        </div>
        <nav className="header__navigation">
          <a href="sign-up" className="header__register-button">
            Регистрация
          </a>
          <a href="sign-in" className="header__login-button">
            Войти
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
