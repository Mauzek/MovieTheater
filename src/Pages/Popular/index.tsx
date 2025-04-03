import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies} from "../../API/api-utils";
import { MovieCardData } from "../../API/types";
import { MovieCardList, Preloader } from "../../components";
import styles from "./Popular.module.css";

interface PopularProps {
  type: "films" | "series" | "animation";
}

const Popular: FC<PopularProps> = ({ type }) => {
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
        let response: MovieCardData[];
        switch (type) {
          case "films":
            response = await getPopularMovies(type);
            setMovies(response);
            break;
          case "series":
            response = await getPopularMovies(type);
            setMovies(response);
            break;
          case "animation":
            response = await getPopularMovies(type);
            setMovies(response);
            break;
          default:
            break;
        }
    
      } catch (error) {
        setError("Не удалось загрузить популярные данные.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [type]);

  const handleFilmClick = () => {
    navigate("/popular/movies");
  };

  const handleSeriesClick = () => {
    navigate("/popular/series");
  };

  const handleCartoonClick = () => {
    navigate("/popular/cartoons");
  };

  return (
    <main>
      <div className={styles.pageHeaderContainer}>

        <nav
          className={`${styles.btnContainer} ${
            type === 'series' ? styles.seriesActive : ""
          }`}
        >
          <button
            className={`${styles.button} ${type === 'films' ? styles.activeButton : ""}`}
            onClick={handleFilmClick}
          >
            ФИЛЬМЫ
          </button>
          <button
            className={`${styles.button} ${type === 'series' ? styles.activeButton : ""} ${
              styles.seriesActive
            }`}
            onClick={handleSeriesClick}
          >
            СЕРИАЛЫ
          </button>
          <button
            className={`${styles.button} ${type === 'animation' ? styles.activeButton : ""} ${
              styles.seriesActive
            }`}
            onClick={handleCartoonClick}
          >
            МУЛЬТФИЛЬМЫ
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
