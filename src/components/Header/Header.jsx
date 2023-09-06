import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className={path === "/" ? "header header_background" : "header"}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-img" src={logo} alt="Логотип" />
        </Link>
        {path === "/movies" || path === "/saved-movies" || path === "/profile" ? (
          <>
            <nav className="header__navigation">
              <Link to="/movies" className="navigation__link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
              </Link>
            </nav>
            <Link
              to="/profile"
              className={
                path === "/"
                  ? "header__navigation-account background_black"
                  : "header__navigation-account background_white"
              }
            ></Link>
          </>
        ) : (
          <nav className="header__navigation">
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
