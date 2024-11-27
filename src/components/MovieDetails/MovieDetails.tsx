import { FC } from "react";
import { MovieData } from "../../API/api-utils";
import styles from "./MovieDetails.module.css";
import NotFound from '../../assets/images/notFound.gif';
import { RatingSection } from "../Rating/RatingSection";
import { Trailers } from "./Trailers/Trailers";
import { DetailsList } from "../InfoItem/DetailsList";

interface MovieDetailsProps {
  movie: MovieData;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
  const uniqueTrailers = movie.videos?.trailers?.filter(
    (trailer, index, self) =>
      self.findIndex((t) => t.url === trailer.url) === index
  );

  const getSeasonsInfo = (): { seasonsCount: number; episodesCount: number } => {
    if (!movie.seasonsInfo) {
      return { seasonsCount: 0, episodesCount: 0 };
    }

    let seasonsCount = 0;
    let episodesCount = 0;

    movie.seasonsInfo.forEach((season) => {
      if (season.number !== 0) {
        seasonsCount++;
        episodesCount += season.episodesCount;
      }
    });

    return { seasonsCount, episodesCount };
  };

  const { seasonsCount, episodesCount } = getSeasonsInfo();

  return (
    <article className={styles.movieDetail}>
      <section className={styles.mainInfo}>
        <header className={styles.posterContainer}>
          <img
            src={movie.poster?.url || NotFound}
            alt={`${movie.name} poster`}
            className={styles.poster}
          />
        </header>

        <section className={styles.details}>
          <h1 className={styles.movieTitle}>{movie.name}</h1>
          {movie.alternativeName && (
            <h2 className={styles.alternativeTitle}>
              {movie.alternativeName}
              {movie.ageRating && (
                <span className={styles.ageRating}> +{movie.ageRating}</span>
              )}
            </h2>
          )}
          <DetailsList data={movie} />
        </section>

        <RatingSection
          kpRating={movie.rating.kp}
          kpVotes={movie.votes.kp}
          imdbRating={movie.rating.imdb}
          imdbVotes={movie.votes.imdb}
          movieType={movie.type}
          movieId={movie.id}
          imdbId={movie.externalId?.imdb}
          seasons={seasonsCount}
          episodes={episodesCount}
        />
      </section>
      <hr className={styles.divider} />
      <section className={styles.descriptionContainer}>
        <header>
          <h2 className={styles.descriptionTitle}>Описание</h2>
        </header>
        <p className={styles.descriptionText}>
          {movie.description || "Описание недоступно."}
        </p>
      </section>
      <hr className={styles.divider} />

      <Trailers uniqueTrailers={uniqueTrailers} />
    </article>
  );
};
