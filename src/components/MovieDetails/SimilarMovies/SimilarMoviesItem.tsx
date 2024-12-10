import { FC, memo } from "react";
import styles from "./SimilarMovies.module.css";

type Movie = {
  id: number;
  poster: { url: string };
  type: string;
};

interface SimilarMoviesItemProps {
  movie: Movie;
  isActive: boolean;
  cardColor: string;
}

export const SimilarMoviesItem: FC<SimilarMoviesItemProps> = memo(
  ({ movie, isActive, cardColor }) => {
    return (
      <div
        className={`${styles.card} ${!isActive ? styles.inactiveCard : ""}`}
        style={{ backgroundColor: cardColor }}
      >
        <img
          src={movie.poster.url}
          alt="Movie poster"
          className={styles.poster}
        />
      </div>
    );
  }
);
