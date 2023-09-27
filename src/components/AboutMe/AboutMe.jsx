// import photo from "../../images/Profile-photo.jpg";
import photo from "../../images/photo_2023-09-27_11-03-10.jpg";

function AboutMe() {
  return (
    <section className="profile">
      <h2 className="profile__title">Студент</h2>
      <div className="profile__contaner">
        <div className="profile__info">
          <h3 className="profile__name">Юрий</h3>
          <p className="profile__job">Фронтенд-разработчик, 26 лет</p>
          <p className="profile__description">
            Я живу в Екатеринбурге. Получил образование по специальности машинист локомотива. У
            меня есть жена и кот. Я люблю слушать музыку, а ещё увлекаюсь
            спортом. Недавно начал кодить. С 2018 года работал в компании «ОАО
            РЖД». После того, как прошёл курс по веб-разработке, ушёл с работы и начал
            заниматься фронтендом.
          </p>
          <a href="https://github.com/YuriiDereguzov" className="profile__link">
            Github
          </a>
        </div>
        <div className="profile__info profile__info_photo_location">
          <img className="profile__photo" src={photo} alt="Фотография" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
