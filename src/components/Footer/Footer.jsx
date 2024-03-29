function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <p className="footer__date">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-container">
            <a className="footer__link" href="https://practicum.yandex.ru/">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-container">
            <a className="footer__link" href="https://github.com/">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
