import { useEffect } from "react";
import Form from "../Form/Form";
import useFormWithValidation from "../../utils/useFormWithValidation";

function Register({ handleRegister, error }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    resetForm();
  }

  return (
    <>
      <Form
        title={"Добро пожаловать!"}
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
          placeholder="Имя"
          required
          minLength="2"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />
        <p className="form__input-error">{errors.name || ""}</p>
        <label className="form__input-placeholder">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form__input"
          placeholder="E-mail"
          required
          onChange={handleChange}
          value={values.email || ""}
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
        />
        <p className="form__input-error">{errors.email || ""}</p>
        <label className="form__input-placeholder">Пароль</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form__input"
          placeholder="Пароль"
          minLength="8"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <p className="form__input-error">{errors.password || ""}</p>
        <h2 className="form__error">{error}</h2>
        <button className="form__submit-button" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </Form>
    </>
  );
}

export default Register;
