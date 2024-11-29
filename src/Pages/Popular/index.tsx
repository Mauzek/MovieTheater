import React, { useEffect, useState } from "react";
import { getPopularMovies, getPopularSeries, MovieCardData } from "../../API/api-utils";
import { Preloader } from "../../components/Preloader/Preloader";
import { MovieCardList } from "../../components/MovieCardList/MovieCardList";

interface PopularProps {
  film: boolean; 
}

const Popular: React.FC<PopularProps> = ({ film }) => {
  const [movies, setMovies] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);

      try {
        const popular = film ? await getPopularMovies() : await getPopularSeries();
        setMovies(popular);
      } catch (error) {
        setError("Не удалось загрузить популярные данные.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [film]);

  return (
    <main>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <MovieCardList
          title="Популярные"
          type={film ? "movie" : "series"}
          movies={movies}
        />
      )}
    </main>
  );
};

export default Popular;
