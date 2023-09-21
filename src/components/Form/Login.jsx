import { useEffect } from "react";
import Form from "../Form/Form";
import useFormWithValidation from "../../utils/useFormWithValidation";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin({ email: values.email, password: values.password });
    resetForm();
  }

  return (
    <>
      <Form
        title={"Рады видеть!"}
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
          id="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
          value={values.email || ""}
        />
        <p className="form__input-error">{errors.email || ""}</p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          className="form__input"
          name="password"
          id="password"
          placeholder="Пароль"
          minLength="8"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <p className="form__input-error">{errors.password || ""}</p>
        <button className="form__submit-button" disabled={!isValid}>
          Войти
        </button>
      </Form>
    </>
  );
}

export default Login;
