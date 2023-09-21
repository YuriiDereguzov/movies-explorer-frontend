import { React, useEffect, useState, useContext } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

function Profile({ loggedIn, handleUpdateUser, handleLogout, error }) {
  const [status, setStatus] = useState(true);
  const [buttonProps, setButtonProps] = useState({ disabled: true });
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

    setStatus(!status);
  }

  // Обработчики изменения инпутов обновляют стейты
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    setStatus(!status);
  }

  const checkEdit = useCallback(() => {
    if (currentUser.name !== name || currentUser.email !== email) {
      setButtonProps({ disabled: false });
      return;
    }
    setButtonProps({ disabled: true });
  }, [name, email, currentUser]);

  useEffect(() => {
    checkEdit();
  }, [checkEdit]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="user">
        <h1 className="user__title">Привет, {currentUser.name}!</h1>
        <form className="user__form" name="form">
          <label className="user__label">
            <p className="user__placeholder">Имя</p>
            <input
              disabled={status}
              type="name"
              className="user__input"
              name="name"
              id="name"
              minLength="2"
              maxLength="30"
              value={name || ""}
              placeholder="Имя"
              onChange={handleChangeName}
            />
          </label>
          <label className="user__label">
            <p className="user__placeholder">E-mail</p>
            <input
              disabled={status}
              type="email"
              className="user__input"
              name="email"
              id="email"
              value={email || ""}
              placeholder="E-mail"
              onChange={handleChangeEmail}
            />
          </label>
          <h2 className="form__error">{error}</h2>
          {status ? (
            <button
              type="submit"
              onClick={handleSubmitEdit}
              className="user__edit"
            >
              Редактировать
            </button>
          ) : (
            <button
              type="submit"
              className={"user__submit"}
              onClick={handleSubmit}
              disabled={buttonProps.disabled}
            >
              Сохранить
            </button>
          )}
        </form>
        <Link to="/" onClick={handleLogout} className="user__link">
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}

export default Profile;
