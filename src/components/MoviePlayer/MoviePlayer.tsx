import React, { useEffect, useRef } from "react";
import styles from './MoviePlayer.module.css';

interface MoviePlayerProps {
  kinopoiskId: number;
}

export const MoviePlayer: React.FC<MoviePlayerProps> = ({ kinopoiskId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kinobox.tv/kinobox.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (containerRef.current && (window as any).kbox) {
        (window as any).kbox(containerRef.current, {
          search: { kinopoisk: kinopoiskId },
          menu: { enabled: true },       
        });
      }
    };

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        console.error("Error removing script:", e);
      }
    };
  }, [kinopoiskId]);

  return (
    <div className={styles.moviePlayerWrapper}>
      <div
        ref={containerRef}
        className={`kinobox_player ${styles.kinobox_player}` }
      ></div>
    </div>
  );
};
