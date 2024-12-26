import { useState, useEffect, useRef, FC } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import { SimilarMoviesItem } from "./SimilarMoviesItem";
import { useNavigate } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";
import ArrowNav from "../../../assets/icons/arrow_back.svg";
import { SimilarAndSequelsMovie } from "../../../API/types";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./SimilarMovies.module.css";

interface SimilarMoviesSectionProps {
  movies: SimilarAndSequelsMovie[];
}

export const SimilarMoviesList: FC<SimilarMoviesSectionProps> = ({
  movies,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardColors, setCardColors] = useState<Record<number, string>>({});
  const [loadedImages, setLoadedImages] = useState<Record<number, string>>({});
  const activeMovie = movies[activeIndex];
  const navigate = useNavigate();
  const facRef = useRef(new FastAverageColor());
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const preloadImages = async () => {
      const loaded: Record<number, string> = {};
      for (const movie of movies) {
        const img = new Image();
        img.src = movie.poster.url;
        await img.decode();
        loaded[movie.id] = movie.poster.url;
      }
      setLoadedImages(loaded);
    };

    preloadImages();
  }, [movies]);

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

  useEffect(() => console.log("Render"));

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Могут понравиться</h2>
      <div className={styles.similarMoviesContainer}>
        <div
          className={styles.backgroundImage}
          style={{
            backgroundImage: `url(${loadedImages[activeMovie.id] || ""})`,
          }}
        ></div>
        <div className={styles.gradient}></div>
        <div className={styles.swiperWrapper}>
          <button
            className={`${styles.navBtn} ${styles.navBtnPrev} ${
              swiperRef.current?.isBeginning ? styles.navBntInactive : ""
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Назад"
          >
            <img src={ArrowNav} alt="Назад" />
          </button>

          <Swiper
            effect="cards"
            navigation={false}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            onSlideChange={handleSlideChange}
            className={styles.swiper}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
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

          <button
            className={`${styles.navBtn} ${styles.navBtnNext} ${
              swiperRef.current?.isEnd ? styles.navBntInactive : ""
            }`}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Вперед"
          >
            <img src={ArrowNav} alt="Вперед" />
          </button>
        </div>
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
              <p className={styles.movieRating}>Рейтинг: {formattedKpRating}</p>
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
