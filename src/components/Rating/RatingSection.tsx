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
  seasons?: number;
  episodes?: number;
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

  return (
    <div className={styles.ratingContainer}>
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
      {seasons && episodes && (
        <article>
          <h2>Сезонов: {seasons}</h2>
          <h3>Всего эпизовод: {episodes}</h3>
        </article>
      )}
    </div>
  );
};
