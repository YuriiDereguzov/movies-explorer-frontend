import { useState } from "react";
import Form from "../Form/Form";

function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(userData)
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        setMessage(`Что-то пошло не так! ${error} `);
      });
  }

  return (
    <>
      <Form
        title={"Добро пожаловать!"}
        buttonText={"Зарегистрироваться"}
        formText={"Уже зарегистрированы?"}
        route={"/sign-in"}
        linkText={"Войти"}
        onSubmit={handleSubmit}
      >
        <label className="form__input-placeholder">Имя</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form__input"
          // value={name || ""}
          placeholder="Виталий"
          onChange={handleChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form__input"
          // value={email || ""}
          placeholder="pochta@yandex.ru"
          onChange={handleChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form__input"
          // value={password || ""}
          placeholder="password"
          onChange={handleChange}
          required
        />
        <p className="form__input-error">{message}</p>
      </Form>
    </>
  );
}

export default Register;
