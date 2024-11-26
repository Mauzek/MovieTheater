import axios from "axios";
import {
  KINOPOISK_API,
  KINOPOISK_API_KEY,
  MOVIEPLAYER_API,
  POPULARMOVIES,
  POPULARSERIES,
  KINOPOISKID_API,
} from "./config";

type ExternalId = {
  imdb: string | null;
};

type Backdrop = {
  url: string;
};

type Genre = {
  name: string;
};

type Country = {
  name: string;
};

type Votes = {
  kp: number;
  imdb: number;
};

type Rating = {
  kp: number;
  imdb: number;
};

export type MovieData = {
  id: number;
  name: string;
  alternativeName?: string;
  ageRating?: number;
  type: string;
  year: number;
  description: string;
  rating: Rating;
  genres: Genre[];
  countries: Country[];
  logo: {
    url: string;
    previewUrl: string;
  };
  poster: {
    url: string;
    previewUrl: string;
  };
  votes: Votes;
  externalId?: ExternalId;
  backdrop?: Backdrop;
  seriesLength?: number;
  movieLength?: number;
};

export type MovieCardData = {
  id: number;
  title: string;
  alternativeTitle: string;
  type: string;
  year: number;
  rating: number;
  posterUrl: string;
  countries: string[];
  genres: string[];
};

type Movie = {
  id: number;
  name: string;
  alternativeName: string;
  type: string;
  year: number;
  rating: Rating;
  poster: {
    url: string;
  };
  countries: Country[];
  genres: Genre[];
};

async function getMovieByTitle(movieName: string): Promise<MovieData> {
  try {
    const response = await axios.get(`${KINOPOISK_API}${movieName}`, {
      headers: {
        "X-API-KEY": KINOPOISK_API_KEY,
      },
    });

    const data = response.data.docs[0];

    const movieData: MovieData = {
      id: data.id,
      name: data.name,
      alternativeName: data.alternativeName,
      ageRating: data.ageRating,
      type: data.type,
      year: data.year,
      description: data.description,
      rating: {
        kp: data.rating.kp,
        imdb: data.rating.imdb,
      },
      genres: data.genres.map((genre: { name: string }) => ({
        name: genre.name,
      })),
      countries: data.countries.map((country: { name: string }) => ({
        name: country.name,
      })),
      logo: {
        url: data.logo?.url || "", // Добавлено значение по умолчанию
        previewUrl: data.logo?.previewUrl || "", // Добавлено значение по умолчанию
      },
      poster: {
        url: data.poster.url,
        previewUrl: data.poster.previewUrl,
      },
      votes: {
        kp: data.votes.kp,
        imdb: data.votes.imdb,
      },
      externalId: data.externalId
        ? {
            imdb: data.externalId.imdb,
          }
        : undefined,
      backdrop: data.backdrop ? { url: data.backdrop.url } : undefined, // Проверка на наличие backdrop
      seriesLength: data.seriesLength,
      movieLength: data.movieLength,
    };

    return movieData;
  } catch (error) {
    console.error("Ошибка при получении данных о фильме:", error);
    throw error;
  }
}

async function getMovieByID(movieID: number): Promise<MovieData> {
  try {
    const response = await axios.get(`${KINOPOISKID_API}${movieID}`, {
      headers: {
        "X-API-KEY": KINOPOISK_API_KEY,
      },
    });
    const data = response.data;
    const movieData: MovieData = {
      id: data.id,
      name: data.name,
      alternativeName: data.alternativeName,
      ageRating: data.ageRating,
      type: data.type,
      year: data.year,
      description: data.description,
      rating: {
        kp: data.rating.kp,
        imdb: data.rating.imdb,
      },
      genres: data.genres.map((genre: { name: string }) => ({
        name: genre.name,
      })),
      countries: data.countries.map((country: { name: string }) => ({
        name: country.name,
      })),
      logo: {
        url: data.logo?.url,
        previewUrl: data.logo?.previewUrl,
      },
      poster: {
        url: data.poster.url,
        previewUrl: data.poster.previewUrl,
      },
      votes: {
        kp: data.votes.kp,
        imdb: data.votes.imdb,
      },
      externalId: data.externalId ? { imdb: data.externalId.imdb } : undefined, // проверка наличия externalId
      backdrop: data.backdrop ? { url: data.backdrop.url } : undefined,
      seriesLength: data.seriesLength,
      movieLength: data.movieLength,
    };

    return movieData;
  } catch (error) {
    console.error("Ошибка при получении данных о фильме:", error);
    throw error;
  }
}

async function getMoviePlayer(playerId: number) {
  try {
    const response = await axios.get(`${MOVIEPLAYER_API}${playerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie player data:", error);
    throw error;
  }
}

async function getPopularMovie(): Promise<MovieCardData[]> {
  try {
    const response = await axios.get(POPULARMOVIES);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format");
    }

    const movies: MovieCardData[] = data.map((movie: MovieCardData) => ({
      ...movie,
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching popular movie data:", error);
    throw error;
  }
}

async function getMoviesByTitle(movieName: string): Promise<MovieCardData[]> {
  try {
    const response = await axios.get(`${KINOPOISK_API}${movieName}`, {
      headers: {
        "X-API-KEY": KINOPOISK_API_KEY,
      },
    });
    const data = response.data.docs;

    const moviesData: MovieCardData[] = data.map(
      (movie: Movie): MovieCardData => ({
        id: movie.id,
        title: movie.name,
        alternativeTitle: movie.alternativeName,
        type: movie.type,
        year: movie.year,
        rating: movie.rating.kp, 
        posterUrl: movie.poster.url, 
        countries: movie.countries.map((country: Country) => country.name), 
        genres: movie.genres.map((genre: Genre) => genre.name), 
      })
    );

    return moviesData;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
}

async function getPopularSeries(): Promise<MovieCardData[]> {
  try {
    const response = await axios.get(POPULARSERIES);
    const data = response.data;

    const series: MovieCardData[] = data.map((series: MovieCardData) => ({
      id: series.id,
      title: series.title,
      alternativeTitle: series.alternativeTitle,
      type: series.type,
      year: series.year,
      rating: series.rating,
      posterUrl: series.posterUrl,
      countries: series.countries,
      genres: series.genres,
    }));

    return series;
  } catch (error) {
    console.error("Error fetching popular series data:", error);
    throw error;
  }
}

export {
  getMoviePlayer,
  getMovieByTitle,
  getMovieByID,
  getPopularMovie,
  getPopularSeries,
  getMoviesByTitle,
};
