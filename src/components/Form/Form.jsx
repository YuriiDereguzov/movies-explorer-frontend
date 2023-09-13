import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <main className="auth">
      <Link to="/">
        <img className="auth__logo" src={logo} alt="Логотип" />
      </Link>
      <h1 className="auth__title">{props.title}</h1>
      <form onSubmit={props.onSubmit} className="form" name="form">
        {props.children}
        <button className="form__submit-button">{props.buttonText}</button>
        <p className="form__links">
          {props.formText}{" "}
          <Link to={props.route} className="form__link">
            {props.linkText}
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
