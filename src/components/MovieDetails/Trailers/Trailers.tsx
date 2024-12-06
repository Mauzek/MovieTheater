import { FC } from "react";
import styles from "./Trailers.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper/modules";
import YouTubeIcon from "../../../assets/icons/youtube.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../custom-swiper-bullet.css";

type Trailer = {
  url: string;
  name: string;
};

interface TrailersProps {
  uniqueTrailers?: Trailer[];
}

export const Trailers: FC<TrailersProps> = ({ uniqueTrailers }) => {
  const extractVideoId = (url: string): string | null => {
    const regex = /youtube\.com\/embed\/([^/?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <section className={styles.trailerSection}>
      {uniqueTrailers && uniqueTrailers.length > 0 ? (
        <Swiper
        autoplay={{ delay: 0, disableOnInteraction: false }}
        loop={true}
        speed={1500}
        freeMode={true}
        slidesPerView={3}
        spaceBetween={20}
        navigation={false}
        mousewheel={uniqueTrailers.length > 3}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation, Mousewheel, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20, navigation: true },
            640: { slidesPerView: 2, spaceBetween: 20, navigation: true },
            1024: { slidesPerView: 3, spaceBetween: 20, },
          }}
        >
          {uniqueTrailers.map((trailer, index) => {
            const videoId = extractVideoId(trailer.url);
            return (
              videoId && (
                <SwiperSlide key={index} className={styles.trailerSlide}>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    className={styles.link_container}
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                      className={styles.trailerVideo}
                      title={`${trailer.name}`}
                      alt={`${trailer.name}`}
                      loading="lazy"
                    />
                    <img className={styles.youTubeIcon} src={YouTubeIcon} />
                  </a>
                  <p className={styles.trailerName}>{trailer.name}</p>
                </SwiperSlide>
              )
            );
          })}
        </Swiper>
      ) : (
        <p className={styles.noVideoText}>Трейлеры отсутствуют</p>
      )}
    </section>
  );
};
