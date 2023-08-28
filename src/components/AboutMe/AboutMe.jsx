import photo from "../../images/Profile-photo.jpg";

function AboutMe() {
  return (
    <section className="profile">
      <h2 className="profile__title">Студент</h2>
      <div className="profile__contaner">
        <div className="profile__info">
          <h3 className="profile__name">Виталий</h3>
          <p className="profile__job">Фронтенд-разработчик, 30 лет</p>
          <p className="profile__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="/#" className="profile__link">
            Github
          </a>
        </div>
        <div className="profile__info photo_location">
          <img className="profile__photo" src={photo} alt="Фотография" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
