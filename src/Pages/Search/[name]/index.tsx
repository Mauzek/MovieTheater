import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieByTitle, MovieCardData } from "../../../API/api-utils";
import { Preloader } from "../../../components/Preloader/Preloader";
import { MovieCardList } from "../../../components/MovieCardList/MovieCardList";

const Search: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [searchResults, setSearchResults] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!name) return;
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

  return (
    <div>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      <MovieCardList
        title="Результаты поиска"
        type="search"
        movies={searchResults}
      />
    </div>
  );
};

export default Search;
