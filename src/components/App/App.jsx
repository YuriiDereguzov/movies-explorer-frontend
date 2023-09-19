import { React, useEffect, useState, useCallback } from "react";
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
import ProtectedRoute from "../ProtectedRoute";

import { getMovies } from "../../utils/MoviesApi.js";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });

  const [filtredMovies, setFiltredMovies] = useState([]);
  const [movieErrText, setMovieErrText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [shortsCheckbox, setShortsCheckbox] = useState(true);

  useEffect(() => {
    // проверяем наличие токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsMoviesLoading(true);
      Auth.authentication(jwt)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsMoviesLoading(false);
        });
      if (localStorage.getItem("Shorts")) {
        setShortsCheckbox(localStorage.getItem("Shorts") === "true");
      }
      if (localStorage.getItem("SearchText")) {
        setSearchText(localStorage.getItem("SearchText"));
      }
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);





  function filterByCheckbox(filtredMovies, checkbox) {
    if (checkbox) {
      return (filtredMovies = filtredMovies.filter(
        (movie) => movie.duration < 40
      ));
    }
    return filtredMovies;
  }

  function checkboxChange(isChecked) {
    setShortsCheckbox(isChecked);
    saveShortsCheckbox(isChecked);
  }

  function saveSearchText(searchText) {
    localStorage.setItem("SearchText", searchText);
  }
  function saveShortsCheckbox(isChecked) {
    localStorage.setItem("Shorts", isChecked);
  }

  const filterMovies = useCallback(() => {
    let AllMovies = JSON.parse(localStorage.getItem("AllMovies"));

    if (searchText === "") {
      return AllMovies;
    }
    let filtredMovies = AllMovies.filter((movie) =>
      movie.nameRU.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    filtredMovies = filterByCheckbox(filtredMovies, shortsCheckbox);

    if (filtredMovies.length === 0) setMovieErrText("Ничего не найдено");
    if (filtredMovies.length > 0) setMovieErrText("");
    return filtredMovies;
  }, [searchText, shortsCheckbox]);

  useEffect(() => {
    if (localStorage.getItem("AllMovies")) {
      setFiltredMovies(filterMovies());
    }
  }, [searchText, filterMovies, shortsCheckbox]);

  function handleSearchSumbit(text) {
    if (text === "") {
      setMovieErrText("Нужно ввести ключевое слово");
      return;
    }
    setMovieErrText("");
    if (!localStorage.getItem("AllMovies")) {
      setIsMoviesLoading(true);
      getMovies()
        .then((res) => {
          localStorage.setItem("AllMovies", JSON.stringify(res));
          setSearchText(text);
          saveSearchText(text);
        })
        .catch((err) => {
          setMovieErrText(`Во время запроса произошла ошибка. Возможно,
           проблема с соединением или сервер недоступен. 
           Подождите немного и попробуйте ещё раз`);
          console.log(err);
        })
        .finally(() => {
          setIsMoviesLoading(false);
        });
    } else {
      setSearchText(text);
      saveSearchText(text);
    }
  }





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
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                handleSearchSumbit={handleSearchSumbit}
                checkboxChange={checkboxChange}
                movies={filtredMovies}
                movieErrText={movieErrText}
                isMoviesLoading={isMoviesLoading}
              />
              // <>
              //   <Header loggedIn={loggedIn} />
              //   {/* <Movies /> */}
              //   <ProtectedRoute
              //     loggedIn={loggedIn}
              //     component={Movies}
              //   />
              //   <Footer />
              // </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn} component={SavedMovies} />
              // <>
              //   <Header loggedIn={loggedIn} />
              //   {/* <SavedMovies /> */}
              //   <ProtectedRoute
              //     loggedIn={loggedIn}
              //     component={SavedMovies}
              //   />
              //   <Footer />
              // </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleSignOut}
              />
              // <>
              //   <Header loggedIn={loggedIn} />
              //   {/* <Profile
              //     handleUpdateUser={handleUpdateUser}
              //     handleLogout={handleSignOut}
              //   /> */}
              //   <ProtectedRoute
              //     loggedIn={loggedIn}
              //     component={Profile}
              //     handleUpdateUser={handleUpdateUser}
              //     handleLogout={handleSignOut}
              //   />
              // </>
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
