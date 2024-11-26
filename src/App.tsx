import React, { useEffect, useState } from "react";
import { SearchField } from "./components/SearchField/SearchField";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import {
  getMovieByID,
  MovieData,
  getPopularMovie,
  MovieCardData,
  getPopularSeries,
  getMoviesByTitle,
} from "./API/api-utils";
import { Preloader } from "./components/Preloader/Preloader";
import "./App.css";
import { MovieCardList } from "./components/MovieCardList/MovieCardList";

const MovieApp: React.FC = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null); // Хранит информацию о конкретном фильме
  const [popularMovies, setPopularMovies] = useState<MovieCardData[]>([]);
  const [searchResults, setSearchResults] = useState<MovieCardData[]>([]); // Состояние для результатов поиска
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilm, setIsFilm] = useState<boolean>(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const popular = isFilm
          ? await getPopularMovie()
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

  const cardSearch = async (movieID: number) => {
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

  const handleSearch = async (movieName: string) => {
    setLoading(true);
    setError(null);
    try {
      const movies: MovieCardData[] = await getMoviesByTitle(movieName);
      setSearchResults(movies);
      setMovieData(null);
    } catch (error) {
      setError("Не удалось загрузить данные о фильме.");
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
      {error && <div>{error}</div>}
      {movieData && movieData.backdrop && (
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
      {searchResults.length > 0 ? ( 
        <div className="search-results">
          <MovieCardList
            title={`Результаты поиска`}
            movies={searchResults}
            setIsFilm={setIsFilm}
            cardSearch={cardSearch}
            isFilm={isFilm}
            movieData={movieData}
          />
        </div>
      ) : (
        movieData === null && ( 
          <div className="popular-movies">
            <MovieCardList
              title={`Популярные`}
              movies={popularMovies}
              setIsFilm={setIsFilm}
              cardSearch={cardSearch}
              isFilm={isFilm}
              movieData={movieData}
            />
          </div>
        )
      )}
      {movieData && !loading && <MovieDetails movie={movieData} />}
    </div>
  );
};

export default MovieApp;
