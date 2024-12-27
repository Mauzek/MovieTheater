import { FC } from "react";
import { Link } from "react-router-dom";
import { MovieCardData } from "../../API/types";
import { NotFoundImage } from "../../assets";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movieCard: MovieCardData;
}

export const MovieCard: FC<MovieCardProps> = ({ movieCard }) => {
  const limitedCountries = movieCard.countries.slice(0, 1).join(", ");
  const formattedGenres = movieCard.genres.slice(0, 2).join(", ");
  const formattedRating = Math.round(movieCard.rating * 10) / 10;
  const type =
    movieCard.type === "Film" || movieCard.type === "movie"
      ? "movies"
      : "series";

  return (
    <Link to={`/${type}/${movieCard.id}`} className={styles.movieCard}>
      <article
  
        aria-label={`Карточка фильма ${movieCard.title}`}
      >
        <div className={styles.imageContainer}>
          <img
            src={movieCard.posterUrl}
            alt={`${movieCard.title} постер`}
            className={styles.movieImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NotFoundImage;
            }}
          />
          <div className={styles.content}>
            <div className={styles.hoverInfo}>
              <p className={styles.rating}>{formattedRating}</p>
              <p className={styles.year}>{movieCard.year}</p>
              <p className={styles.genres}>{formattedGenres}</p>
              <p className={styles.countries}>{limitedCountries}</p>
            </div>
          </div>
        </div>
        <label className={styles.title}>{movieCard.title}</label>
      </article>
    </Link>
  );
};
