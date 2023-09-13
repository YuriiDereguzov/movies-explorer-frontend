import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEditSubmit(e) {
    e.preventDefault();
    handleEditSubmit({ name, email });
  }

  return (
    <main className="user">
      <h1 className="user__title">Привет, Виталий!</h1>
      <form className="user__form" onSubmit={handleEditSubmit} name="form">
        <label className="user__label">
          <p className="user__placeholder">Имя</p>
          <input
            type="name"
            className="user__input"
            name="Name"
            id="name"
            value={name || ""}
            placeholder="Виталий"
            onChange={handleNameChange}
          />
        </label>
        <label className="user__label">
          <p className="user__placeholder">E-mail</p>
          <input
            type="email"
            className="user__input"
            name="Email"
            id="email"
            value={email || ""}
            placeholder="pochta@yandex.ru"
            onChange={handleEmailChange}
          />
        </label>
        <button type="submit" className="user__edit">
          Редактировать
        </button>
      </form>
      <Link to="/sign-in" className="user__link">
        Выйти из аккаунта
      </Link>
    </main>
  );
}

export default Profile;
