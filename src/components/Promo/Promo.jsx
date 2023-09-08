import landingLogo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo header_background">
      <div className="promo__container">
        <div className="promo__title-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="#project" className="promo__button">
            Узнать больше
          </a>
        </div>
        <div className="promo__logo-container">
          <img className="promo__logo" src={landingLogo} alt="landingLogo" />
        </div>
      </div>
    </section>
  );
}

export default Promo;
