import axios, { AxiosResponse } from "axios";
import { endpoints, API_KEYS } from "./config";
import {
  ApiErrorResponse,
  ApiMovieCardData,
  ApiMovieCardDataByTitle,
  ApiMovieData,
  MovieCardData,
  MovieData,
} from "./types";

let currentKeyIndex = 0;
const API_KEYS_LIST = [
  API_KEYS.kinopoisk,
  API_KEYS.kinopoisk_2,
  API_KEYS.kinopoisk_3,
];

function transformMovieData(data: ApiMovieData): MovieData {
  return {
    id: data.id,
    name: data.name,
    alternativeName: data.alternativeName ?? null,
    year: data.year,
    releaseYears: data.releaseYears || [],
    description: data.description ?? null,
    ageRating: data.ageRating ?? null,
    type: data.type,
    rating: {
      kp: data.rating.kp,
      imdb: data.rating.imdb,
    },
    votes: {
      kp: data.votes.kp,
      imdb: data.votes.imdb,
    },
    externalId: {
      imdb: data.externalId.imdb,
    },
    genres: data.genres.map((genre) => ({ name: genre.name })),
    countries: data.countries.map((country) => ({ name: country.name })),
    seasonsInfo: data.seasonsInfo || [],
    movieLength: data.movieLength || undefined,
    seriesLength: data.seriesLength || undefined,
    poster: {
      url: data.poster.url,
      previewUrl: data.poster.previewUrl,
    },
    backdrop: data.backdrop?.url ? { url: data.backdrop.url } : undefined,
    logo: data.logo?.url
      ? { url: data.logo.url, previewUrl: data.logo.previewUrl }
      : undefined,
    premiere: data.premiere
      ? {
          russia: data.premiere.russia ?? undefined,
          world: data.premiere.world ?? undefined,
        }
      : undefined,
    videos: data.videos
      ? {
          trailers: data.videos.trailers.map((trailer) => ({
            url: trailer.url,
            name: trailer.name,
          })),
        }
      : undefined,
    persons:
      data.persons
        ?.filter(
          (person) =>
            person.profession === "актеры" &&
            person.description !== "дополнительные голоса" &&
            person.description !== null
        )
        .slice(0, 12)
        .map((person) => ({
          id: person.id,
          name: person.name || person.enName || "Unknown",
          photo: person.photo || "",
          role: person.enProfession,
          description: person.description || "",
        })) || [],
    sequelsAndPrequels: data.sequelsAndPrequels.map((movie) => ({
      id: movie.id,
      name: movie.name,
      alternativeName: movie.alternativeName,
      rating: {
        kp: movie.rating?.kp || 0,
        imdb: movie.rating?.imdb || 0,
      },
      type: movie.type,
      year: movie.year || 0,
      poster: {
        url: movie.poster.url,
      },
    })),
    similarMovies: data.similarMovies.map((movie) => ({
      id: movie.id,
      name: movie.name,
      alternativeName: movie.alternativeName ?? undefined,
      rating: {
        kp: movie.rating?.kp || 0,
        imdb: movie.rating?.imdb || 0,
      },
      type: movie.type,
      year: movie.year || 0,
      poster: {
        url: movie.poster.url,
      },
    })),
  };
}

function transformMovieByTitle(data: ApiMovieCardDataByTitle): MovieCardData {
  return {
    id: data.id,
    title: data.name || "Unknown title",
    alternativeTitle: data.alternativeName ?? undefined,
    year: data.year,
    rating: data.rating?.kp || 0,
    genres: data.genres.map((genre: { name: string }) => genre.name),
    countries: data.countries.map((country: { name: string }) => country.name),
    posterUrl: data.poster?.url || "",
    type: data.type || "Unknown",
  };
}

function transformToMovieCard(movie: ApiMovieCardData): MovieCardData {
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
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: { "X-API-KEY": API_KEYS_LIST[currentKeyIndex] },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as ApiErrorResponse;
        if (
          axiosError.response?.status === 403 &&
          axiosError.response?.data?.message.includes(
            "Вы израсходовали ваш суточный лимит"
          )
        ) {
          console.warn(`API key exhausted: ${currentKeyIndex}`);
          currentKeyIndex++;
        } else {
          console.error("Error during API call:", axiosError);
          throw axiosError;
        }
      } else {
        console.error("Unexpected error:", error);
        throw error;
      }
    }
  }
  throw new Error("All API keys have been exhausted");
}

const getMovieByTitle = async (movieName: string): Promise<MovieCardData[]> => {
  try {
    const url = endpoints.searchMovies(1, 10, movieName);
    const data = await fetchWithRetries<{ docs: ApiMovieCardDataByTitle[] }>(
      url
    );
    if (!data.docs || data.docs.length === 0) {
      throw new Error("Movies not found");
    }
    return data.docs.map(transformMovieByTitle);
  } catch (error) {
    console.error("Error fetching movies by title:", error);
    throw error;
  }
};

const getMovieByID = async (movieID: string): Promise<MovieData> => {
  try {
    const url = endpoints.getMovieById(movieID);
    const data = await fetchWithRetries<ApiMovieData>(url);
    return transformMovieData(data);
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

const getPopularMovies = async (): Promise<MovieCardData[]> => {
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
};

const getPopularSeries = async (): Promise<MovieCardData[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      endpoints.getPopularMovies("series")
    );
    return response.data.map(transformToMovieCard);
  } catch (error) {
    console.error("Error fetching popular series:", error);
    throw error;
  }
};

export { getMovieByTitle, getMovieByID, getPopularMovies, getPopularSeries };
