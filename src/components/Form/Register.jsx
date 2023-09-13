import { useState } from "react";
import Form from "../Form/Form";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleRegisterSubmit(e) {
    e.preventDefault();
    props.HandleRegisterSubmit({ name, password, email });
  }

  return (
    <>
      <Form
        title={"Добро пожаловать!"}
        buttonText={"Зарегистрироваться"}
        formText={"Уже зарегистрированы?"}
        route={"/sign-in"}
        linkText={"Войти"}
        onSubmit={handleRegisterSubmit}
      >
        <label className="form__input-placeholder">Имя</label>
        <input
          type="text"
          className="form__input"
          name="name"
          id="register-name"
          value={name || ""}
          placeholder="Виталий"
          onChange={handleNameChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">E-mail</label>
        <input
          type="email"
          className="form__input"
          name="email"
          id="register-email"
          value={email || ""}
          placeholder="pochta@yandex.ru"
          onChange={handleEmailChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          className="form__input"
          name="password"
          id="register-password"
          value={password || ""}
          placeholder="password"
          onChange={handlePasswordChange}
          required
        />
        <p className="form__input-error">Что-то пошло не так...</p>
      </Form>
    </>
  );
}

export default Register;
