import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination, Autoplay } from "swiper/modules";
import FsLightbox from "fslightbox-react";
import YouTubeIcon from "../../../assets/icons/youtube.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../custom-swiper-bullet.css";
import styles from "./Trailers.module.css";

type Trailer = {
  url: string;
  name: string;
};

interface TrailersProps {
  uniqueTrailers?: Trailer[];
}

export const Trailers: FC<TrailersProps> = ({ uniqueTrailers }) => {
  const [lightboxState, setLightboxState] = useState<{
    toggler: boolean;
    currentIndex: number;
  }>({ toggler: false, currentIndex: 0 });

  const extractVideoId = (url: string): string | null => {
    const regex = /youtube\.com\/embed\/([^/?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const lightboxSources = uniqueTrailers
    ?.map((trailer) => {
      const videoId = extractVideoId(trailer.url);
      return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
    })
    .filter(Boolean) as string[];

  const handleSlideClick = (index: number) => {
    setLightboxState({ toggler: !lightboxState.toggler, currentIndex: index });
  };

  return (
    <section className={styles.trailerSection}>
      {uniqueTrailers && uniqueTrailers.length > 0 ? (
        <>
          <Swiper
            // autoplay={{ delay: 0, disableOnInteraction: false }}
            // loop={true}
            // speed={1500}
            freeMode={true}
            slidesPerView={3}
            spaceBetween={20}
            navigation={true}
            mousewheel={uniqueTrailers.length > 3}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation, Mousewheel, Autoplay]}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20, navigation: true },
              640: { slidesPerView: 2, spaceBetween: 20, navigation: true },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {uniqueTrailers.map((trailer, index) => {
              const videoId = extractVideoId(trailer.url);
              return (
                videoId && (
                  <SwiperSlide
                    key={index}
                    className={styles.trailerSlide}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className={styles.link_container}>
                      <img
                        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                        className={styles.trailerVideo}
                        title={trailer.name}
                        alt={trailer.name}
                        loading="lazy"
                      />
                      <img
                        className={styles.youTubeIcon}
                        src={YouTubeIcon}
                        alt="Иконка YouTube"
                      />
                    </div>
                    <p className={styles.trailerName}>{trailer.name}</p>
                  </SwiperSlide>
                )
              );
            })}
          </Swiper>

          {lightboxSources && (
            <FsLightbox
              toggler={lightboxState.toggler}
              sources={lightboxSources}
              slide={lightboxState.currentIndex + 1}
            />
          )}
        </>
      ) : (      
        <p className={styles.noVideoText}>Трейлеры отсутствуют</p>
      )}
    </section>
  );
};
