import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieCardData } from "../../API/api-utils";
import styles from "./MovieCardList.module.css";

interface MovieCardListProps {
  movies: MovieCardData[];
  title: string;
  type?: "movie" | "series" | "search";
  changeCategory?: (value: boolean) => void;
}

export const MovieCardList: FC<MovieCardListProps> = ({ movies, title, type, changeCategory }) => {
  const navigate = useNavigate();

  const handleFilmClick = () => {
    if (changeCategory) {
      changeCategory(true);
    }
    navigate('/popular/movies');
  };

  const handleSeriesClick = () => {
    if (changeCategory) {
      changeCategory(false);
    }
    navigate('/popular/series');
  };

  return (
    <div className={styles.cardList}>
      <h1 className={styles.title}>{title}</h1>
      {type !== "search" && (
        <div className={styles.btnContainer}>
          <button
            className={`${styles.button} ${type === "movie" ? styles.activeButton : ""}`}
            onClick={handleFilmClick}
          >
            ФИЛЬМЫ
          </button>
          <button
            className={`${styles.button} ${type === "series" ? styles.activeButton : ""}`}
            onClick={handleSeriesClick}
          >
            СЕРИАЛЫ
          </button>
        </div>
      )}
      <div className={styles.moviesContainer}>
        {movies
          .filter((movie) => movie.posterUrl && movie.posterUrl.trim() !== "")
          .map((movie) => (
            <MovieCard key={movie.id} movieCard={movie} />
          ))}
      </div>
    </div>
  );
};
