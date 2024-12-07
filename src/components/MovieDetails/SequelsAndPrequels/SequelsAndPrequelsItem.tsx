import { FC } from "react";
import { SimilarAndSequelsMovie } from "../../../API/api-utils";
import styles from "./SequelsAndPrequels.module.css";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../../assets/images/notFound.gif";
import ArrowIcon from "../../../assets/icons/arrow_back.svg";

interface SequelsAndPrequelsItemProps {
  movie: SimilarAndSequelsMovie;
}

export const SequelsAndPrequelsItem: FC<SequelsAndPrequelsItemProps> = ({
  movie,
}) => {
  const { id } = useParams<{ id: string }>();
  const type = ["Film", "movie", "anime", "cartoon"].includes(movie.type)
    ? "movies"
    : "series";
  const formattedKpRating = movie.rating
    ? Math.round(movie.rating?.kp * 10) / 10
    : "??";

  const movieContent = (
    <>
      <img
        src={movie.poster.url || NotFound}
        alt={movie.name}
        className={styles.moviePoster}
      />
      <div className={styles.movieDetails}>
        <h3 className={styles.movieTitle}>
          {movie.name}{" "}
          {movie.id.toString() === id && (
            <span className={styles.location}> Вы сейчас здесь</span>
          )}
        </h3>
        {movie.alternativeName && (
          <h4 className={styles.movieAlternativeTitle}>
            {movie.alternativeName}
          </h4>
        )}
        <p className={styles.movieRating}>
          Рейтинг: {formattedKpRating} | {movie.year}
        </p>
      </div>
    </>
  );

  return (
    <article className={styles.movieItem}>
      {movie.id.toString() !== id ? (
        <Link to={`/${type}/${movie.id}`} className={styles.movieLink}>
          {movieContent}
        </Link>
      ) : (
        <div className={styles.movieLink}>{movieContent}</div>
      )}
      <img src={ArrowIcon} alt="Стрелка" className={styles.arrowIcon} />
    </article>
  );
};
