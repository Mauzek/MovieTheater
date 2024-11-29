import React, { useEffect, useState } from "react";
import {
  getPopularMovies,
  getPopularSeries,
  MovieCardData,
} from "../../API/api-utils";
import { Preloader } from "../../components/Preloader/Preloader";
import { MovieCardList } from "../../components/MovieCardList/MovieCardList";

const Popular: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilm, setIsFilm] = useState<boolean>(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const popular = isFilm
          ? await getPopularMovies()
          : await getPopularSeries();
        setPopularMovies(popular);
      } catch (error) {
        setError("Не удалось загрузить популярные фильмы.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [isFilm]);

  return (
    <div>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      <MovieCardList
        title="Популярные"
        type={isFilm ? "movie" : "series"}
        changeCategory={setIsFilm}
        movies={popularMovies}
      />
    </div>
  );
};

export default Popular;
