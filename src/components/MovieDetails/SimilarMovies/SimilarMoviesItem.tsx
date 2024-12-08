import React from "react";
import { Link } from "react-router-dom";
import styles from "./SimilarMovies.module.css";

type Movie = {
  id: number;
  poster: { url: string };
  type: string;
};

interface SimilarMoviesItemProps {
  movie: Movie;
  isActive: boolean;
}

export const SimilarMoviesItem: React.FC<SimilarMoviesItemProps> = ({
  movie,
  isActive
}) => {
  const type = ["Film", "movie", "anime", "cartoon"].includes(movie.type)
    ? "movies"
    : "series";

  return (
    <Link to={`/${type}/${movie.id}`} className={`${styles.link} `}>
      <div className={`${styles.card} ${!isActive ? styles.inactiveCard: ""}`}>
        <img
          src={movie.poster.url}
          alt="Movie poster"
          className={styles.poster}
        />
      </div>
    </Link>
  );
};
