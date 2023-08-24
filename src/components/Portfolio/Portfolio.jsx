import icon from "../../images/strelka.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="/#">
            <p className="portfolio__link-item">Статичный сайт</p>
            <img src={icon} alt="Стрека" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="/#">
            <p className="portfolio__link-item">Адаптивный сайт</p>
            <img src={icon} alt="Стрека" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="/#">
            <p className="portfolio__link-item">Одностраничное приложение</p>
            <img src={icon} alt="Стрека" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
