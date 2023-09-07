import logo from "../../images/logo.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header className={path === "/" ? "header header_background" : "header"}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-img" src={logo} alt="Логотип" />
        </Link>
        {path === "/movies" ||
        path === "/saved-movies" ||
        path === "/profile" ? (
          <>
            <nav
              className={`header__navigation ${isOpen ? "menu_opened" : ""}`}
            >
              <ul className="navigation__container">
                <li
                  className={
                    isOpen ? "navigation__link-item" : "display_inactive"
                  }
                >
                  <Link to="/" className="navigation__link">
                    Главная
                  </Link>
                </li>
                <li
                  className={`navigation__link-item ${
                    path === "/movies" ? "link_active" : ""
                  }`}
                >
                  <Link to="/movies" className="navigation__link">
                    Фильмы
                  </Link>
                </li>
                <li
                  className={`navigation__link-item ${
                    path === "/saved-movies" ? "link_active" : ""
                  }`}
                >
                  <Link to="/saved-movies" className="navigation__link">
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              to="/profile"
              className={
                path === "/"
                  ? "header__navigation-account background_black"
                  : `header__navigation-account background_white ${
                      isOpen ? "menu_opened" : ""
                    }`
              }
            ></Link>
            {!isOpen ? (
              <div className="header__burger" onClick={handleOpenMenu}>
                <div className="header__burger-line"></div>
                <div className="header__burger-line"></div>
                <div className="header__burger-line"></div>
              </div>
            ) : (
              <button
                className="header__burger-close"
                onClick={handleOpenMenu}
              ></button>
            )}
          </>
        ) : (
          <nav className="header__nav">
            <Link to="/sign-up" className="header__register-link">
              Регистрация
            </Link>
            <Link to="/sign-in" className="header__login-link">
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
