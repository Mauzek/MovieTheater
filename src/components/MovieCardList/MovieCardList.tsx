import { FC } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieCardData } from "../../API/api-utils";
import styles from "./MovieCardList.module.css";
import { MovieData } from "../../API/api-utils";

interface MovieCardListProps {
  movies: MovieCardData[];
  title: string;
  isFilm: boolean;
  movieData: MovieData | null;
  setIsFilm: (value: boolean) => void;
  cardSearch: (value: string) => void;
}

export const MovieCardList: FC<MovieCardListProps> = ({
  movies,
  title,
  cardSearch,
  setIsFilm,
  isFilm,
  movieData,
}) => {
  return (
    <div className={styles.cardList}>
      <h1 className={styles.title}>{title}</h1>
      {movieData === null && title !== "Результаты поиска" && (
        <div className={styles.btnContainer}>
          <button
            className={`${styles.button} ${isFilm ? styles.activeButton : ""}`}
            onClick={() => setIsFilm(true)}
            disabled={isFilm}
          >
            ФИЛЬМЫ
          </button>
          <button
            className={`${styles.button} ${!isFilm ? styles.activeButton : ""}`}
            onClick={() => setIsFilm(false)}
            disabled={!isFilm}
          >
            СЕРИАЛЫ
          </button>
        </div>
      )}
      <div className={styles.moviesContainer}>
        {movies
          .filter((movie) => movie.posterUrl && movie.posterUrl.trim() !== "")
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movieCard={movie}
              cardSearch={cardSearch}
            />
          ))}
      </div>
    </div>
  );
};
