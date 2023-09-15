import { useState } from "react";
import Form from "../Form/Form";

function Register({ handleLogin }) {
  const [userData, setUserData] = useState({
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

    if (!userData.email || !userData.password) {
      return;
    }

    handleLogin(userData)
      .then(() => {
        setUserData({ email: "", password: "" });
        setMessage("");
      })
      .catch((error) => {
        setMessage(`Что-то пошло не так! ${error} `);
        console.log(message);
      });
  }

  return (
    <>
      <Form
        title={"Рады видеть!"}
        buttonText={"Войти"}
        formText={"Ещё не зарегистрированы?"}
        route={"/sign-up"}
        linkText={"Регистрация"}
        onSubmit={handleSubmit}
      >
        <label className="form__input-placeholder">E-mail</label>
        <input
          type="email"
          className="form__input"
          name="email"
          id="login-email"
          // value={email || ""}
          placeholder="pochta@yandex.ru"
          onChange={handleChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          className="form__input"
          name="password"
          id="login-password"
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
