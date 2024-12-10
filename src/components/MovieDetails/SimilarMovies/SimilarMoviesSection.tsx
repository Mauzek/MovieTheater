import { useState, useEffect, useRef, FC } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { SimilarMoviesItem } from "./SimilarMoviesItem";
import { useNavigate } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";
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

export const SimilarMoviesSection: FC<SimilarMoviesSectionProps> = ({
  movies,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardColors, setCardColors] = useState<Record<number, string>>({});
  const activeMovie = movies[activeIndex];
  const navigate = useNavigate();
  const facRef = useRef(new FastAverageColor());

  useEffect(() => {
    const fetchColors = async () => {
      const colors: Record<number, string> = {};
      for (const movie of movies) {
        try {
          const color = await facRef.current.getColorAsync(movie.poster.url);
          colors[movie.id] = color.hex || "#C20637";
        } catch {
          colors[movie.id] = "#C20637";
        }
      }
      setCardColors(colors);
    };

    fetchColors();
  }, [movies]);

  const handleSlideChange = (swiper: SwiperClass) => {
    if (swiper.activeIndex !== activeIndex) {
      setActiveIndex(swiper.activeIndex);
    }
  };

  const handleWatchClick = () => {
    const type = ["Film", "movie", "anime", "cartoon"].includes(
      activeMovie.type
    )
      ? "movies"
      : "series";
    navigate(`/${type}/${activeMovie.id}`);
  };

  const formattedKpRating = Math.round(activeMovie.rating?.kp * 10) / 10;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Могут понравиться</h2>
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
                cardColor={cardColors[movie.id] || "#C20637"}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {activeMovie && (
          <div className={`${styles.movieInfo} ${styles.fadeIn}`}>
            <h3 className={styles.movieTitle}>{activeMovie.name}</h3>
            {activeMovie.alternativeName && (
              <h4 className={styles.movieAlternativeTitle}>
                {activeMovie.alternativeName}
              </h4>
            )}
            {activeMovie.year > 0 && (
              <p className={styles.movieYear}>Год: {activeMovie.year}</p>
            )}
            {activeMovie.rating?.kp > 0 && (
              <p className={styles.movieRating}>
                Рейтинг: {formattedKpRating}
              </p>
            )}
            <button className={styles.watchButton} onClick={handleWatchClick}>
              Смотреть
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
