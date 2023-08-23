import landingLogo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <div className="promo header_background">
      <div className="promo__container">
        <div className="promo__title-container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a href="/" className="promo__button">
            Узнать больше
          </a>
        </div>
        <div className="promo__logo-container">
          <img className="promo__logo" src={landingLogo} alt="logo"></img>
        </div>
      </div>
    </div>
  );
}

export default Promo;