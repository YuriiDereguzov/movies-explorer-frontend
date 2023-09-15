import logo from "../../images/logo.svg";
import icon from "../../images/icon-account.svg";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn }) {
  const location = useLocation();
  const path = location.pathname;

  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header
      className={path === "/" ? "header header__background_gren" : "header"}
    >
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-img" src={logo} alt="Логотип" />
        </Link>
        {loggedIn ? (
          <>
            <nav
              className={`header__navigation ${
                isOpen ? "header__navigation_opened" : ""
              }`}
            >
              <ul className="header__navigation-container">
                <li
                  className={
                    isOpen
                      ? `header__navigation-links ${
                        path === "/" ? "header__navigation-links_active" : ""
                      }`
                      : "header__navigation-links_inactive"
                  }
                >
                  <Link to="/" className="header__navigation-link header__navigation-link_color_black">
                    Главная
                  </Link>
                </li>
                <li
                  className={`header__navigation-links ${
                    path === "/movies" ? "header__navigation-links_active" : ""
                  }`}
                >
                  {/* <Link to="/movies" className="header__navigation-link">
                    Фильмы
                  </Link> */}
                  <Link to="/movies" 
                    className={
                      path === "/"
                        ? `header__navigation-link ${
                          isOpen
                            ? "header__navigation-link_color_black"
                            : "header__navigation-link_color_white"
                        }`
                        : "header__navigation-link header__navigation-link_color_black"
                    }
                  >
                    Фильмы
                  </Link>
                </li>
                <li
                  className={`header__navigation-links ${
                    path === "/saved-movies"
                      ? "header__navigation-links_active"
                      : ""
                  }`}
                >
                  {/* <Link to="/saved-movies" className="header__navigation-link">
                    Сохранённые фильмы
                  </Link> */}
                  <Link to="/saved-movies" 
                    className={
                      path === "/"
                        ? `header__navigation-link ${
                          isOpen
                            ? "header__navigation-link_color_black"
                            : "header__navigation-link_color_white"
                        }`
                        : "header__navigation-link header__navigation-link_color_black"
                    }
                    // className={
                    //   path === "/"
                    //     ? "header__navigation-link header__navigation-link_color_white"
                    //     : "header__navigation-link header__navigation-link_color_black"
                    // }
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              to="/profile"
              className={
                path === "/"
                  ? `header__navigation-account header__navigation-account_background_green ${
                      isOpen ? "header__navigation_opened" : ""
                    }`
                  : `header__navigation-account ${
                      isOpen ? "header__navigation_opened" : ""
                    }`
              }
            >
              <p className="header__navigation-text">Аккаунт</p>
              <div className="header__navigation-background">
                <img
                  className="header__navigation-icon"
                  src={icon}
                  alt="Профиль"
                />
              </div>
            </Link>
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
