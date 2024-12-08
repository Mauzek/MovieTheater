import React, { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { SimilarMoviesItem } from "./SimilarMoviesItem";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./SimilarMovies.module.css";

type Movie = {
  id: number;
  name: string;
  alternativeName?: string;
  rating: { kp: number };
  type: string;
  year: number;
  poster: { url: string };
};

interface SimilarMoviesSectionProps {
  movies: Movie[];
}

export const SimilarMoviesSection: React.FC<SimilarMoviesSectionProps> = ({
  movies,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMovie = movies[activeIndex];
  const navigate = useNavigate();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleWatchClick = () => {
    const type = ["Film", "movie", "anime", "cartoon"].includes(
      activeMovie.type
    )
      ? "movies"
      : "series";
    navigate(`/${type}/${activeMovie.id}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          onSlideChange={handleSlideChange}
          className={styles.swiper}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <SimilarMoviesItem
                movie={movie}
                isActive={index === activeIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {activeMovie && (
          <div className={`${styles.movieInfo} ${styles.fadeIn}`}>
            <h3  className={styles.movieTitle}>{activeMovie.name}</h3>
            {activeMovie.alternativeName && (
              <h4 className={styles.movieAlternativeTitle}>
                {activeMovie.alternativeName}
              </h4>
            )}
            <p className={styles.movieYear}>Год: {activeMovie.year}</p>
            <p className={styles.movieRating}>Рейтинг: {activeMovie.rating?.kp}</p>
            <button className={styles.watchButton} onClick={handleWatchClick}>
              Смотреть
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
