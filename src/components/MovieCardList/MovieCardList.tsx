import { FC } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieCardData } from "../../API/api-utils";
import styles from "./MovieCardList.module.css";

interface MovieCardListProps {
  movies: MovieCardData[];
}

export const MovieCardList: FC<MovieCardListProps> = ({ movies}) => {

  return (
    <section className={styles.cardList}>
      <div className={styles.moviesContainer}>
        {movies
          .filter((movie) => movie.posterUrl && movie.posterUrl.trim() !== "")
          .map((movie) => (
            <MovieCard key={movie.id} movieCard={movie} />
          ))}
      </div>
    </section>
  );
};
