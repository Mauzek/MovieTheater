import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Movie from "./Pages/Movie/[name]";
import Popular from "./Pages/Popular";
import Search from "./Pages/Search/[name]";
import { Layout } from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/popular/movies" />} />
        <Route path="movies/:name" element={<Movie />} />
        <Route path="series/:name" element={<Movie />} />
        <Route path="popular" element={<Popular />}>
          <Route path="movies"  element={<Popular />} />
          <Route path="series" element={<Popular />} />
        </Route>
        <Route path="search/:name" element={<Search />} />
      </Route>
      <Route path="*" element={<div>Страница не найдена</div>} />
    </Routes>
  );
};

export default App;
