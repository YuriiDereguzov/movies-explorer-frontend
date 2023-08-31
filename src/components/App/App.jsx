import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Notfound from "../NotFound/NotFound";
import Register from "../Form/Register";
import Login from "../Form/Login";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header />
              {/* <Searchform />
              <Movies  /> */}
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header />
              {/* <Searchform />
              <Movies
                movies={movies.filter((movie) => movie.saved === true)}
              /> */}
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              {/* <Profile /> */}
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/404" element={<Notfound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
