import { FC } from "react";
import styles from "./Rating.module.css";
import KinopoiskIcon from "../../assets/icons/kinopoisk-logo-icon.svg";
import ImdbIcon from "../../assets/icons/imdb_logo.svg";
import { Rating } from "../Rating/Rating";

interface RatingSectionProps {
  kpRating: number;
  kpVotes: number;
  imdbRating: number;
  imdbVotes: number;
  movieType: string;
  movieId: number;
  imdbId?: string | null;
  seasons?: number | null;
  episodes?: number | null;
}

export const RatingSection: FC<RatingSectionProps> = ({
  kpRating,
  kpVotes,
  imdbRating,
  imdbVotes,
  movieType,
  movieId,
  imdbId,
  seasons,
  episodes,
}) => {
  const formattedKpRating = Math.round(kpRating * 10) / 10;
  const formattedImdbRating = Math.round(imdbRating * 10) / 10;
  const shouldShowSeasons = seasons !== 0 && episodes !== 0;

  return (
    <section className={styles.ratingContainer}>
      <Rating
        label="KP"
        rating={formattedKpRating}
        votes={kpVotes}
        icon={KinopoiskIcon}
        link={`https://www.kinopoisk.ru/${
          movieType === "movie" || movieType === "cartoon" ? "film" : "series"
        }/${movieId}`}
      />
      <Rating
        label="IMDb"
        rating={formattedImdbRating}
        votes={imdbVotes}
        icon={ImdbIcon}
        link={`https://www.imdb.com/title/${imdbId}`}
      />
      {shouldShowSeasons && (
        <article className={styles.seasonStats}>
          <h4 className={styles.seasonStatsTitle}>Сезонов: {seasons}</h4>
          <p className={styles.seasonStatsSubtitle}>
            Всего эпизодов: {episodes}
          </p>
        </article>
      )}
    </section>
  );
};
