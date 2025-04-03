import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies} from "../../API/api-utils";
import { MovieCardData } from "../../API/types";
import { MovieCardList, Preloader } from "../../components";
import styles from "./Popular.module.css";

interface PopularProps {
  film: boolean;
}

const Popular: FC<PopularProps> = ({ film }) => {
  const [movies, setMovies] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);
      // const genres = await getMoviesGenres();
      // console.log(genres);
      // const films = await getMoviesByGenre(genres[1].slug, 1);
      // console.log(films);
      try {
        const popular = film
          ? await getPopularMovies("films")
          : await getPopularMovies("series");
        setMovies(popular);
      } catch (error) {
        setError("Не удалось загрузить популярные данные.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [film]);

  const handleFilmClick = () => {
    navigate("/popular/movies");
  };

  const handleSeriesClick = () => {
    navigate("/popular/series");
  };

  return (
    <main>
      <div className={styles.pageHeaderContainer}>

        <nav
          className={`${styles.btnContainer} ${
            !film ? styles.seriesActive : ""
          }`}
        >
          <button
            className={`${styles.button} ${film ? styles.activeButton : ""}`}
            onClick={handleFilmClick}
          >
            ФИЛЬМЫ
          </button>
          <button
            className={`${styles.button} ${!film ? styles.activeButton : ""} ${
              styles.seriesActive
            }`}
            onClick={handleSeriesClick}
          >
            СЕРИАЛЫ
          </button>
        </nav>
      </div>

      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && <MovieCardList movies={movies} />}
    </main>
  );
};

export default Popular;
