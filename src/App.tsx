import React from "react";
import { Route, Routes } from "react-router-dom";
import { Movie, Popular, Search } from "./Pages";
import { Layout } from "./components";
import { CatalogPage } from "./Pages/Home";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<CatalogPage />} />
        {/* <Route path="/" element={<Navigate to="/popular/movies" />} /> */}
        <Route path="movies/:id" element={<Movie />} />
        <Route path="series/:id" element={<Movie />} />
        <Route path="popular">
          <Route path="movies" element={<Popular type="films" />} />
          <Route path="series" element={<Popular type="series" />} />
          <Route path="cartoons" element={<Popular type="animation" />} />
        </Route>
        <Route path="search/:name" element={<Search />} />
      </Route>
      <Route path="*" element={<div>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <a href="/home">На главную</a>
      </div>} />
    </Routes>
  );
};

export default App;
