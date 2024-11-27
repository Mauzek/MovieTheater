import axios, { AxiosResponse } from "axios";
import { endpoints, API_KEYS } from "./config";

type ExternalId = { imdb: string | null };
type Backdrop = { url: string };
type Genre = { name: string };
type Country = { name: string };
type Votes = { kp: number; imdb: number };
type Rating = { kp: number; imdb: number };
type ReleaseYears = {start: number, end: number};
type SeasonInfo = {number: number, episodesCount: number};

let currentKeyIndex = 0; 
const API_KEYS_LIST = [API_KEYS.kinopoisk, API_KEYS.kinopoisk_2, API_KEYS.kinopoisk_3];

export type MovieData = {
  id: number;
  name: string;
  alternativeName?: string;
  year: number;
  releaseYears?: ReleaseYears[];
  description: string;
  shortDescription?: string;
  ageRating: number;
  type: string;
  rating: Rating;
  votes: Votes;
  externalId: ExternalId;
  genres: Genre[];
  countries: Country[];
  seasonsInfo?: SeasonInfo[];
  movieLength?: number;
  seriesLength?: number;
  poster: {
    url: string;
    previewUrl: string;
  };
  backdrop?: Backdrop;
  logo?: {
    url: string;
    previewUrl: string;
  };
  premiere?: {
    russia?: string;
    world?: string;
  };
  videos?: {
    trailers: {
      url: string;
      name: string;
    }[];
  };
};

export type MovieCardData = {
  id: string;
  title: string;
  alternativeTitle?: string;
  type: string;
  year: number;
  rating: number;
  posterUrl: string;
  countries: string[];
  genres: string[];
};

function transformMovieData(data: any): MovieData {
  return {
    id: data.id,
    name: data.name,
    alternativeName: data.alternativeName,
    year: data.year,
    releaseYears: data.releaseYears,
    description: data.description,
    shortDescription: data.shortDescription,
    ageRating: data.ageRating,
    type: data.type,
    rating: {
      kp: data.rating.kp,
      imdb: data.rating.imdb,
    },
    votes: {
      kp: data.votes.kp,
      imdb: data.votes.imdb,
    },
    externalId: data.externalId,
    genres: data.genres,
    countries: data.countries,
    seasonsInfo: data.seasonsInfo,
    movieLength: data.movieLength,
    seriesLength: data.seriesLength,
    poster: {
      url: data.poster.url,
      previewUrl: data.poster.previewUrl,
    },
    backdrop: data.backdrop ? { url: data.backdrop.url } : undefined,
    logo: data.logo
      ? { url: data.logo.url, previewUrl: data.logo.previewUrl }
      : undefined,
    premiere: data.premiere
      ? {
          russia: data.premiere.russia,
          world: data.premiere.world,
        }
      : undefined,
    videos: data.videos ? { trailers: data.videos.trailers } : undefined,
  };
}

function transformMovieById(data: any): MovieCardData {
  return {
    id: data.id,
    title: data.name || "Unknown Title",
    alternativeTitle: data.alternativeName,
    year: data.year,
    rating: data.rating?.kp || 0,
    genres: data.genres.map((genre: { name: string }) => genre.name),
    countries: data.countries.map((country: { name: string }) => country.name),
    posterUrl: data.poster?.url || "",
    type: data.type || "Unknown",
  };
}

function transformToMovieCard(movie: any): MovieCardData {
  return {
    id: movie.id,
    title: movie.title,
    type: movie.type,
    year: movie.year,
    rating: movie.rating,
    posterUrl: movie.posterUrl,
    countries: movie.countries,
    genres: movie.genres,
  };
}
async function fetchWithRetries<T>(url: string): Promise<T> {
  while (currentKeyIndex < API_KEYS_LIST.length) {
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: { "X-API-KEY": API_KEYS_LIST[currentKeyIndex] },
      });
      return response.data; 
    } catch (error: any) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.message.includes("Вы израсходовали ваш суточный лимит")
      ) {
        console.warn(`API key exhausted: ${currentKeyIndex}`);
        currentKeyIndex++; 
      } else {
        console.error("Error during API call:", error);
        throw error; 
      }
    }
  }
  throw new Error("All API keys have been exhausted");
}

async function getMovieByTitle(movieName: string): Promise<MovieCardData[]> {
  try {
    const url = endpoints.searchMovies(1, 10, movieName);
    const data = await fetchWithRetries<{ docs: MovieCardData[] }>(url);
    if (!data.docs || data.docs.length === 0) {
      throw new Error("Movies not found");
    }
    return data.docs.map(transformMovieById);
  } catch (error) {
    console.error("Error fetching movies by title:", error);
    throw error;
  }
}

// Example: Get movie by ID
async function getMovieByID(movieID: string): Promise<MovieData> {
  try {
    const url = endpoints.getMovieById(movieID);
    const data = await fetchWithRetries(url);
    return transformMovieData(data);
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
}

async function getPopularMovies(): Promise<MovieCardData[]> {
  try {
    const response: AxiosResponse = await axios.get(
      endpoints.getPopularMovies("film")
    );
    const data = response.data;
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format");
    }
    return data.map(transformToMovieCard);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
}

async function getPopularSeries(): Promise<MovieCardData[]> {
  try {
    const response: AxiosResponse = await axios.get(
      endpoints.getPopularMovies("series")
    );
    return response.data.map(transformToMovieCard);
  } catch (error) {
    console.error("Error fetching popular series:", error);
    throw error;
  }
}

export { getMovieByTitle, getMovieByID, getPopularMovies, getPopularSeries };
