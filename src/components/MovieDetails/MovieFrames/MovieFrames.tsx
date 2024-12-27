import { FC, useState } from "react";
import { MovieImages } from "../../../API/types";
import { ViewIcon } from "../../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import FsLightbox from "fslightbox-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../custom-swiper-bullet.css";
import styles from "./MovieFrames.module.css";

interface MovieFramesProps {
  frames: MovieImages;
}

export const MovieFrames: FC<MovieFramesProps> = ({ frames }) => {
  const [lightboxState, setLightboxState] = useState<{
    toggler: boolean;
    currentIndex: number;
  }>({ toggler: false, currentIndex: 0 });

  const handleSlideClick = (index: number) => {
    setLightboxState({ toggler: !lightboxState.toggler, currentIndex: index });
  };

  return (
    <section className={styles.frameSection}>
      {frames && frames.items.length > 0 ? (
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            navigation={true}
            mousewheel={frames.items.length > 3}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation, Mousewheel]}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20, navigation: true },
              640: { slidesPerView: 2, spaceBetween: 20, navigation: true },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {frames.items.map((frame, index) => (
              <SwiperSlide
                key={index}
                className={styles.frameSlide}
                onClick={() => handleSlideClick(index)}
              >
                <div className={styles.link_container}>
                  <img
                    src={frame.imageUrl}
                    className={styles.frameImage}
                    loading="lazy"
                    alt={`Картинка ${index}`}
                  />
                  <img
                    className={styles.viewIcon}
                    src={ViewIcon}
                    alt="Иконка просмотра"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {frames.items.length > 0 && (
            <FsLightbox
              toggler={lightboxState.toggler}
              sources={frames.items.map((frame) => frame.imageUrl)}
              slide={lightboxState.currentIndex + 1}
            />
          )}
        </>
      ) : (
        <p className={styles.noFrameText}>Кадры отсутствуют</p>
      )}
    </section>
  );
};
