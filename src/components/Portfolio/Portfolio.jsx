import icon from "../../images/strelka.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://yuriidereguzov.github.io/how-to-learn/">
            <p className="portfolio__link-name">Статичный сайт</p>
            <img className="portfolio__link-icon" src={icon} alt="Стрека" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://yuriidereguzov.github.io/russian-travel/">
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <img className="portfolio__link-icon" src={icon} alt="Стрека" />
          </a>
        </li>
        <li className="portfolio__list-item">
          {/* <a className="portfolio__link" href="https://projects.nomoredomains.monster"> */}
          <a className="portfolio__link" href="https://yuriidereguzov.github.io/react-mesto-auth">
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <img className="portfolio__link-icon" src={icon} alt="Стрека" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
