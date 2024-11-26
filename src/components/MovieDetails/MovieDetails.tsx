import { FC } from "react";
import { MovieData } from "../../API/api-utils";
import styles from "./MovieDetails.module.css";
import KinopoiskIcon from "../../assets/icons/kinopoisk-logo-icon.svg";
import ImdbIcon from "../../assets/icons/imdb_logo.svg";
import { InfoItem } from "../InfoItem/InfoItem.tsx";
import { Rating } from "../Rating/Rating.tsx";

interface MovieDetailsProps {
  movie: MovieData;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {

  const getMovieTypeText = (type: string): string => {
    const movieTypeMap: Record<string, string> = {
      movie: "фильм",
      "tv-series": "сериал",
      cartoon: "мультфильм",
      anime: "аниме",
    };
    return movieTypeMap[type] || "неизвестный тип";
  };
  const formattedRatingKP = Math.round(movie.rating.kp * 10) / 10;
  const formattedRatingIMDB = Math.round(movie.rating.imdb * 10) / 10;
  const movieTypeText = getMovieTypeText(movie.type);

  return (
    <article className={styles.movieDetail}>
      <section className={styles.mainInfo}>
        <header className={styles.posterContainer}>
          <img
            src={movie.poster.url}
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
          <div className={styles.infoContainer}>
            <dl>
              <InfoItem
                label="Год выпуска:"
                value={
                  <time dateTime={movie.year.toString()}>{movie.year}</time>
                }
              />
              <InfoItem label="Тип:" value={movieTypeText} />
              <InfoItem
                label="Жанры:"
                value={movie.genres.map((genre) => genre.name).join(", ")}
              />
              <InfoItem
                label="Страны:"
                value={movie.countries
                  .map((country) => country.name)
                  .join(", ")}
              />
              {movie.seriesLength && (
                <InfoItem
                  label="Длина серии:"
                  value={
                    movie.seriesLength > 60
                      ? `${Math.floor(movie.seriesLength / 60)} ч ${
                          movie.seriesLength % 60
                        } мин`
                      : `${movie.seriesLength} мин`
                  }
                />
              )}
              {movie.movieLength && (
                <InfoItem
                  label="Длина фильма:"
                  value={`${Math.floor(movie.movieLength / 60)} ч ${
                    movie.movieLength % 60
                  } мин`}
                />
              )}
            </dl>
          </div>
        </section>
        <div className={styles.ratingContainer}>
          <Rating
            label="KP"
            rating={formattedRatingKP}
            votes={movie.votes.kp}
            icon={KinopoiskIcon}
            link={`https://www.kinopoisk.ru/${
              movieTypeText === "фильм" || movieTypeText === "мультфильм"
                ? "film"
                : "series"
            }/${movie.id}`}
          />
          <Rating
            label="IMDb"
            rating={formattedRatingIMDB}
            votes={movie.votes.imdb}
            icon={ImdbIcon}
            link={`https://www.imdb.com/title/${movie?.externalId?.imdb}`}
          />
        </div>
      </section>
      <hr className={styles.divider} />
      <section className={styles.descriptionContainer}>
        <h2 className={styles.descriptionTitle}>Описание</h2>
        <p className={styles.descriptionText}>{movie.description}</p>
      </section>
    </article>
  );
};

export default MovieDetails;
