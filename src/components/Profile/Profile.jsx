import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleUpdateUser, handleLogout }) {
  // Стейты, в которых содержится значение инпутов
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    handleUpdateUser({
      name,
      email,
    });
  }
  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <main className="user">
      <h1 className="user__title">Привет, {currentUser.name}!</h1>
      <form className="user__form" name="form">
        <label className="user__label">
          <p className="user__placeholder">Имя</p>
          <input
            type="name"
            className="user__input"
            name="name"
            id="name"
            value={name || ""}
            placeholder="Виталий"
            onChange={handleChangeName}
          />
        </label>
        <label className="user__label">
          <p className="user__placeholder">E-mail</p>
          <input
            type="email"
            className="user__input"
            name="email"
            id="email"
            value={email || ""}
            placeholder="pochta@yandex.ru"
            onChange={handleChangeEmail}
          />
        </label>
        <button type="submit" onClick={handleSubmit} className="user__edit">
          Редактировать
        </button>
      </form>
      <Link to="/" onClick={handleLogout} className="user__link">
        Выйти из аккаунта
      </Link>
    </main>
  );
}

export default Profile;
