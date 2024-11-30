import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getMovieByTitle, MovieCardData } from "../../../API/api-utils";
import { Preloader } from "../../../components/Preloader/Preloader";
import { MovieCardList } from "../../../components/MovieCardList/MovieCardList";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [searchResults, setSearchResults] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!name) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const movies: MovieCardData[] = await getMovieByTitle(name);
        if (movies.length === 0) {
          setError("Результаты не найдены.");
        }
        setSearchResults(movies);
      } catch (error) {
        setError("Не удалось загрузить результаты поиска.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [name]);

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  return (
    <main>
      <h1 className={styles.title}>Результаты поиска</h1>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      <MovieCardList movies={memoizedSearchResults} />
    </main>
  );
};

export default Search;
