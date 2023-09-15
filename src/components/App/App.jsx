import { React, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Register from "../Form/Register";
import Login from "../Form/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import * as Auth from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import * as Api from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // проверяем наличие токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.authentication(jwt).then((userData) => {
        // console.log(userData);
        setLoggedIn(true);
        setCurrentUser(userData);
      });
    }
  }, [navigate]);

  function handleRegister({ name, email, password }) {
    return Auth.register(name, email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        // setIsInfoToolTipOpen(true);
        // setTooltipStatusText("Вы успешно зарегистрировались!");
      })
      .catch(() => {
        console.log("Не зареган");
        // setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    return Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/profile", { replace: true });
        }
      })
      .catch(() => {
        console.log("Не вошел");
        // setIsInfoToolTipOpen(true);
      });
  }

  function handleUpdateUser(userData) {
    return Auth.editProfile(userData.name, userData.email)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении информации пользователя: ${err}`);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile
                  handleUpdateUser={handleUpdateUser}
                  handleLogout={handleSignOut}
                />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Register handleRegister={handleRegister} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Login handleLogin={handleLogin} />
              </>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
