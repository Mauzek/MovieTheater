import { FC } from 'react';
import { SimilarAndSequelsMovie } from '../../../API/api-utils';
import styles from './SequelsAndPrequels.module.css';
import { Link } from 'react-router-dom';
import NotFound from '../../../assets/images/notFound.gif'

interface SequelsAndPrequelsItemProps {
  movie: SimilarAndSequelsMovie;
}

export const SequelsAndPrequelsItem: FC<SequelsAndPrequelsItemProps> = ({ movie }) => {
  const type = movie.type === "Film" || movie.type === "movie" ? "movies" : "series";
  const formattedKpRating = movie.rating ? Math.round(movie.rating?.kp * 10) / 10 : '??';
  console.log(movie)
  return (
    <article className={styles.movieItem}>
      <Link to={`/${type}/${movie.id}`} className={styles.movieLink}>
        <img src={movie.poster.url || NotFound} alt={movie.name} className={styles.moviePoster} />
        <div className={styles.movieDetails}>
          <h3 className={styles.movieTitle}>{movie.name}</h3>
          {movie.alternativeName && <h4 className={styles.movieAlternativeTitle}>{movie.alternativeName}</h4>}
          <p className={styles.movieRating}>Рейтинг: {formattedKpRating} | {movie.year}</p>
        </div>
      </Link>
    </article>
  );
};
