import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Movie from "./Pages/Movie/[name]";
import Popular from "./Pages/Popular";
import Search from "./Pages/Search/[name]";
import { Layout } from "./components";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/popular/movies" />} />
        <Route path="movies/:id" element={<Movie />} />
        <Route path="series/:id" element={<Movie />} />
        <Route path="popular">
          <Route path="movies"  element={<Popular film={true} />} />
          <Route path="series" element={<Popular film={false}/>} />
        </Route>
        <Route path="search/:name" element={<Search />} />
      </Route>
      <Route path="*" element={<div>Страница не найдена</div>} />
    </Routes>
  );
};

export default App;
