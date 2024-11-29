import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieCard.module.css";
import { MovieCardData } from "../../API/api-utils";
import notFound from "../../assets/images/notFound.png";

interface MovieCardProps {
  movieCard: MovieCardData;
}

export const MovieCard: FC<MovieCardProps> = ({ movieCard }) => {
  const navigate = useNavigate();
  const limitedCountries = movieCard.countries.slice(0, 1).join(", ");
  const formattedGenres = movieCard.genres.slice(0, 2).join(", ");
  const formattedRating = Math.round(movieCard.rating * 10) / 10;

  const handleClick = () => {
    const type = movieCard.type === "Film" ? "movies" : "series";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/${type}/${movieCard.id}`);
  };
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={styles.movieCard}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Карточка фильма ${movieCard.title}`}
      role="button"
    >
      <div className={styles.imageContainer}>
        <img
          src={movieCard.posterUrl}
          alt={`${movieCard.title} постер`}
          className={styles.movieImage}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = notFound;
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
  );
};
