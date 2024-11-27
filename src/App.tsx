import React, { useEffect, useState } from "react";
import { SearchField } from "./components/SearchField/SearchField";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import {
  getMovieByID,
  MovieData,
  getPopularMovies,
  MovieCardData,
  getPopularSeries,
  getMovieByTitle,
} from "./API/api-utils";
import { Preloader } from "./components/Preloader/Preloader";
import "./App.css";
import { MovieCardList } from "./components/MovieCardList/MovieCardList";

const MovieApp: React.FC = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [popularMovies, setPopularMovies] = useState<MovieCardData[]>([]);
  const [searchResults, setSearchResults] = useState<MovieCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilm, setIsFilm] = useState<boolean>(true);

  // Загрузка популярных фильмов или сериалов
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const popular = isFilm
          ? await getPopularMovies()
          : await getPopularSeries();
        setPopularMovies(popular);
      } catch (error) {
        setError("Не удалось загрузить популярные фильмы.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, [isFilm]);

  // Поиск фильма по ID
  const cardSearch = async (movieID: string) => {
    console.log("Fetching movie data by ID for", movieID);
    setLoading(true);
    setError(null);
    try {
      const movie: MovieData = await getMovieByID(movieID);
      setMovieData(movie);
    } catch (error) {
      setError("Не удалось загрузить данные о фильме.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Поиск фильмов по названию
  const handleSearch = async (movieName: string) => {
    setLoading(true);
    setError(null);
    try {
      const movies: MovieCardData[] = await getMovieByTitle(movieName);
      if (movies.length === 0) {
        setError("Результаты не найдены.");
      }
      setSearchResults(movies);
      setMovieData(null);
    } catch (error) {
      setError("Не удалось загрузить результаты поиска.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setMovieData(null);
    setSearchResults([]);
  };

  return (
    <div id="app">
      <SearchField onSearch={handleSearch} goHome={goHome} />
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}

      {movieData ? (
        <>
          {movieData.backdrop && (
            <>
              <div
                className="backdrop"
                style={{
                  backgroundImage: `url(${movieData.backdrop.url})`,
                }}
              />
              <div className="gradient" />
            </>
          )}
          <MovieDetails movie={movieData} />
        </>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <MovieCardList
              title="Результаты поиска"
              movies={searchResults}
              setIsFilm={setIsFilm}
              cardSearch={cardSearch}
              isFilm={isFilm}
              movieData={movieData}
            />
          ) : (
            !loading && (
              <MovieCardList
                title="Популярные"
                movies={popularMovies}
                setIsFilm={setIsFilm}
                cardSearch={cardSearch}
                isFilm={isFilm}
                movieData={movieData}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default MovieApp;
