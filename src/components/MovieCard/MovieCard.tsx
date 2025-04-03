import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCardData } from "../../API/types";
import { NotFoundImage } from "../../assets";
import styles from "./MovieCard.module.css";

interface MovieCardProps {
  movieCard: MovieCardData;
}

export const MovieCard: FC<MovieCardProps> = ({ movieCard }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const limitedCountries = movieCard.countries.slice(0, 1).join(", ");
  const formattedGenres = movieCard.genres.slice(0, 2).join(", ");
  const formattedRating = Math.round(movieCard.rating * 10) / 10;
  const formattedPoster = movieCard.posterUrl.replace("/orig", "/300x");
  const type =
    movieCard.type === "Film" || movieCard.type === "movie"
      ? "movies"
      : "series";
      
  const getRatingClass = () => {
    if (formattedRating >= 7) return styles.highRating;
    if (formattedRating >= 5) return styles.mediumRating;
    return styles.lowRating;
  };

  const isNew = movieCard.year === new Date().getFullYear();

  return (
    <Link to={`/${type}/${movieCard.id}`} className={styles.movieCard}>
      <article aria-label={`Карточка фильма ${movieCard.title}`}>
        <div className={styles.imageContainer}>
          {!imageLoaded && <div className={styles.imagePlaceholder} />}
          <img
            src={formattedPoster}
            alt={`${movieCard.title} постер`}
            className={`${styles.movieImage} ${imageLoaded ? styles.loaded : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NotFoundImage;
              setImageLoaded(true);
            }}
          />
          <div className={styles.content}>
            <div className={styles.hoverInfo}>
              <div className={`${styles.rating} ${getRatingClass()}`}>
                <span>{formattedRating}</span>
              </div>
              <p className={styles.year}>{movieCard.year}</p>
              <p className={styles.genres}>{formattedGenres || "Жанр не указан"}</p>
              <p className={styles.countries}>{limitedCountries || "Страна не указана"}</p>
            </div>
          </div>
          
          {isNew && (
            <div className={styles.newBadge}>
              <span>Новинка</span>
            </div>
          )}
          
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{movieCard.title}</h3>
        </div>
      </article>
    </Link>
  );
};
