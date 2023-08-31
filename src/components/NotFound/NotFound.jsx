import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <section  className="error">
      <div className="error__contaner">
        <h1 className="error__title">404</h1>
        <h2 className="error__description">Страница не найдена</h2>
        <button className="error__button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </section >
  );
}

export default Notfound;
