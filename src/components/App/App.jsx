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
import Preloader from "../Preloader/Preloader";
import {
  //Коды ошибок
  CONFLICT_ERROR_CODE,
  //Длительность короткометражек
  DURATION_SHORT_MOVIES,
  //Порог смены экрана
  SCREEN_WIDTH_1025,
  SCREEN_WIDTH_768,
  SCREEN_WIDTH_500,
  //Стандартное колличество фильмов на странице
  INITIAL_COUNT_MOVIES_FOR_DEFAULT,
  INITIAL_COUNT_MOVIES_FOR_MOBILE,
  INITIAL_COUNT_MOVIES_FOR_MIDDLE,
  INITIAL_COUNT_MOVIES_FOR_DESKTOP,
  //Колличество фильмов отображаемые при нажатии кнопки "Еще"
  TWO_COUNT_MOVIES_FOR_MORE_BUTTON,
  THREE_COUNT_MOVIES_FOR_MORE_BUTTON,
  FOUR_COUNT_MOVIES_FOR_MORE_BUTTON,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [isCheckedToken, setIsCheckedToken] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);

  const [filtredMovies, setFiltredMovies] = useState([]);
  const [movieErrText, setMovieErrText] = useState("");
  const [searchText, setSearchText] = useState("");

  const [shortsCheckbox, setShortsCheckbox] = useState(false);

  const [savedFiltredMovies, setSavedFiltredMovies] = useState([]);
  const [savedMovieErrText, setSavedMovieErrText] = useState("");
  const [savedSearchText, setSavedSearchText] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");

  const [moreMovies, setMoremuvies] = useState(2);
  const [moviesAmount, setMoviesAmount] = useState(5);
  const [moreMoviesButton, setMoreMoviesButton] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    setError("");
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
          setIsCheckedToken(false);
          setIsMoviesLoading(false);
        });
      Auth.getMySavedMovies()
        .then((res) => {
          setSavedMovies(res);
          setSavedFiltredMovies(res);
        })
        .catch((data) => console.log(data));
      if (localStorage.getItem("Shorts")) {
        setShortsCheckbox(localStorage.getItem("Shorts") === "true");
      }
      if (localStorage.getItem("SearchText")) {
        setSearchText(localStorage.getItem("SearchText"));
      }
    } else {
      setLoggedIn(false);
      setIsCheckedToken(false);
    }
    return () => window.removeEventListener("resize", resize);
  }, [navigate]);

  function resize() {
    if (window.innerWidth > SCREEN_WIDTH_1025) {
      setMoremuvies(FOUR_COUNT_MOVIES_FOR_MORE_BUTTON);
      setMoviesAmount(INITIAL_COUNT_MOVIES_FOR_DESKTOP);
    } else if (window.innerWidth > SCREEN_WIDTH_768) {
      setMoremuvies(THREE_COUNT_MOVIES_FOR_MORE_BUTTON);
      setMoviesAmount(INITIAL_COUNT_MOVIES_FOR_MIDDLE);
    } else if (window.innerWidth > SCREEN_WIDTH_500) {
      setMoremuvies(TWO_COUNT_MOVIES_FOR_MORE_BUTTON);
      setMoviesAmount(INITIAL_COUNT_MOVIES_FOR_MOBILE);
    } else {
      setMoviesAmount(INITIAL_COUNT_MOVIES_FOR_DEFAULT);
    }
  }

  function handleClickMoreMovies() {
    setMoviesAmount(moviesAmount + moreMovies);
  }

  function onMovieButtonClick(movie, isSaved) {
    // Если фильм сохранен
    if (isSaved) {
      //Ищем фильм для удаления
      let movieToDelete = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      if (movieToDelete === undefined) {
        movieToDelete = savedMovies.find(
          (savedMovie) => savedMovie.movieId === movie.movieId
        );
      }
      //Удаляем
      Auth.deleteMovie(movieToDelete._id)
        .then(() => {
          const newArray = savedMovies.filter(
            (item) => item._id !== movieToDelete._id
          );
          setSavedMovies(newArray);
        })
        .catch((data) => console.log(data));
    } else {
      //Если фильм не сохранен - сохраняем
      Auth.saveMovie(movie)
        .then((res) => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((data) => console.log(data));
    }
  }

  function showAllSavedMovies() {
    setSavedMovieErrText("");
    setSavedFiltredMovies(savedMovies);
  }

  function handleSavedMoviesSearchSubmit(text) {
    setSavedMovieErrText("");
    setSavedSearchText(text);
  }

  const filterSaved = useCallback(() => {
    if (savedSearchText === "") {
      let filteredCheckbox = filterByCheckbox(savedMovies, shortsCheckbox);

      if (filteredCheckbox.length === 0)
        setSavedMovieErrText("Ничего не найдено");
      if (filteredCheckbox.length > 0) setSavedMovieErrText("");
      return filteredCheckbox;
    }
    let filtredMovies = savedMovies.filter((movie) =>
      movie.nameRU
        .toLocaleLowerCase()
        .includes(savedSearchText.toLocaleLowerCase())
    );
    filtredMovies = filterByCheckbox(filtredMovies, shortsCheckbox);

    if (filtredMovies.length === 0) setSavedMovieErrText("Ничего не найдено");
    if (filtredMovies.length > 0) setSavedMovieErrText("");
    return filtredMovies;
  }, [savedSearchText, shortsCheckbox, savedMovies]);

  useEffect(() => {
    if (window.location.pathname === "/saved-movies") {
      setSavedFiltredMovies(filterSaved());
    }
  }, [savedSearchText, shortsCheckbox, savedMovies, filterSaved]);

  function saveSearchText(searchText) {
    localStorage.setItem("SearchText", searchText);
  }
  function saveShortsCheckbox(isChecked) {
    localStorage.setItem("Shorts", isChecked);
  }

  function filterByCheckbox(filtredMovies, checkbox) {
    if (checkbox) {
      return (filtredMovies = filtredMovies.filter(
        (movie) => movie.duration < DURATION_SHORT_MOVIES
      ));
    }
    return filtredMovies;
  }

  function checkboxChange(isChecked) {
    setShortsCheckbox(isChecked);
    saveShortsCheckbox(isChecked);
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

    if (filtredMovies.length > moviesAmount) {
      setMoreMoviesButton(true);
    } else {
      setMoreMoviesButton(false);
    }

    filtredMovies = filtredMovies.slice(0, moviesAmount);
    return filtredMovies;
  }, [searchText, shortsCheckbox, moviesAmount]);

  useEffect(() => {
    if (localStorage.getItem("AllMovies")) {
      setFiltredMovies(filterMovies());
    }
  }, [searchText, filterMovies, shortsCheckbox]);

  function handleSearchSumbit(text) {
    resize();
    if (text === "") {
      setMovieErrText("Нужно ввести ключевое слово");
      setMoreMoviesButton(false);
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
    setIsDisabled(true);
    return Auth.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes(CONFLICT_ERROR_CODE)) {
          setError("Пользователь с таким Email уже существует");
        } else {
          setError("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsDisabled(true);
    return Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  function handleUpdateUser(userData) {
    return Auth.editProfile(userData.name, userData.email)
      .then((userData) => {
        setCurrentUser(userData);
        setError("Успешно обновленно!");
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении информации пользователя: ${err}`);
        if (err.includes(CONFLICT_ERROR_CODE)) {
          setError("Пользователь с таким Email уже существует");
        } else {
          setError("Что то пошло не так...");
        }
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
              isCheckedToken ? (
                <Preloader />
              ) : (
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Movies}
                  handleSearchSumbit={handleSearchSumbit}
                  checkboxChange={checkboxChange}
                  movies={filtredMovies}
                  movieErrText={movieErrText}
                  isMoviesLoading={isMoviesLoading}
                  onMovieButtonCkick={onMovieButtonClick}
                  savedMovies={savedMovies}
                  moreMoviesButton={moreMoviesButton}
                  handleClickMoreMovies={handleClickMoreMovies}
                />
              )
            }
          />
          <Route
            path="/saved-movies"
            element={
              isCheckedToken ? (
                <Preloader />
              ) : (
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={SavedMovies}
                  handleSearchSumbit={handleSavedMoviesSearchSubmit}
                  checkboxChange={checkboxChange}
                  movies={savedFiltredMovies}
                  movieErrText={savedMovieErrText}
                  isMoviesLoading={isMoviesLoading}
                  onMovieButtonCkick={onMovieButtonClick}
                  savedMovies={savedMovies}
                  showAllSavedMovies={showAllSavedMovies}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isCheckedToken ? (
                <Preloader />
              ) : (
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Profile}
                  handleUpdateUser={handleUpdateUser}
                  handleLogout={handleSignOut}
                  error={error}
                />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              !isCheckedToken ? (
                <Register
                  handleRegister={handleRegister}
                  error={error}
                  isDisabled={isDisabled}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/sign-in"
            element={
              !isCheckedToken ? (
                <Login
                  handleLogin={handleLogin}
                  error={error}
                  isDisabled={isDisabled}
                />
              ) : (
                <Navigate to="/" replace />
              )
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
