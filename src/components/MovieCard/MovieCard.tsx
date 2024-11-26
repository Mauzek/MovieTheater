import { FC } from "react";
import styles from "./MovieCard.module.css";
import { MovieCardData } from "../../API/api-utils";

interface MovieCardProps {
  movieCard: MovieCardData;
  cardSearch: (value: number) => void; 
}

export const MovieCard: FC<MovieCardProps> = ({ movieCard, cardSearch }) => {
  const limitedCountries = movieCard.countries.slice(0, 1).join(", ");
  const formattedGenres = movieCard.genres.slice(0, 2).join(", ");
  const formattedRating = Math.round(movieCard.rating * 10) / 10;
  return (
    <article className={styles.movieCard} onClick={() => cardSearch(movieCard.id)}> 
      <div className={styles.imageContainer}>
        <img
          src={movieCard.posterUrl}
          alt={`${movieCard.title} постер`}
          className={styles.movieImage}
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
  );
};
