import { useState } from "react";
import Form from "../Form/Form";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleLoginSubmit(e) {
    e.preventDefault();
    props.handleLoginSubmit({ password, email });
  }

  return (
    <>
      <Form
        title={"Рады видеть!"}
        buttonText={"Войти"}
        formText={"Ещё не зарегистрированы?"}
        route={"/sign-up"}
        linkText={"Регистрация"}
        onSubmit={handleLoginSubmit}
      >
        <label className="form__input-placeholder">E-mail</label>
        <input
          type="email"
          className="form__input"
          name="Email"
          id="login-email"
          value={email || ""}
          onChange={handleEmailChange}
          required
        />
        <p className="form__input-error"></p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          className="form__input"
          name="Password"
          id="login-password"
          value={password || ""}
          onChange={handlePasswordChange}
          required
        />
        <p className="form__input-error"></p>
      </Form>
    </>
  );
}

export default Register;
