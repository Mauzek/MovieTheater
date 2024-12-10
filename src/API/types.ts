//Типы для API
interface ApiExternalId {
  kpHD: string | null;
  imdb: string | null;
  tmdb: number | null;
}

interface ApiBackdrop {
  url: string | null;
  previewUrl: string | null;
}

interface ApiPoster {
  url: string;
  previewUrl: string;
}

interface ApiGenre {
  name: string;
}

interface ApiCountry {
  name: string;
}

interface ApiVotes {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
}

interface ApiRating {
  kp: number;
  imdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number | null;
}

interface ApiReleaseYear {
  start: number;
  end: number;
}

interface ApiSeasonInfo {
  number: number;
  episodesCount: number;
}

interface ApiTrailer {
  url: string;
  name: string;
  site: string;
  type: string;
}

interface ApiVideos {
  trailers: ApiTrailer[];
}

interface ApiPremiere {
  world: string | null;
  russia: string | null;
  digital: string | null;
  cinema: string | null;
  bluray: string | null;
  dvd: string | null;
}

interface ApiNetwork {
  name: string;
}

export interface ApiPerson {
  id: number;
  name: string | null;
  enName: string | null;
  photo: string | null;
  description: string | null;
  profession: string;
  enProfession: string;
}

export interface ApiSimilarAndSequelsMovie {
  id: number;
  name: string;
  enName?: string;
  alternativeName?: string;
  type: string;
  poster: ApiPoster;
  rating?: ApiRating;
  year?: number;
}

export interface ApiMovieCardData {
  id: number;
  title: string;
  alternativeTitle: string | null;
  type: string;
  year: number;
  rating: number;
  posterUrl: string;
  countries: string[];
  genres: string[];
}

export interface ApiMovieCardDataByTitle {
  id: number;
  name: string;
  alternativeName: string | null;
  type: string;
  year: number;
  rating: ApiRating;
  poster: ApiPoster;
  countries: ApiCountry[];
  genres: ApiGenre[];
}

export interface ApiMovieData {
  id: number;
  name: string;
  alternativeName: string | null;
  enName: string | null;
  type: string;
  description: string | null;
  shortDescription: string | null;
  year: number;
  ageRating: number | null;
  movieLength: number | null;
  seriesLength: number | null;
  status: string;
  poster: ApiPoster;
  backdrop: ApiBackdrop | null;
  logo: ApiBackdrop | null;
  rating: ApiRating;
  votes: ApiVotes;
  externalId: ApiExternalId;
  countries: ApiCountry[];
  genres: ApiGenre[];
  releaseYears: ApiReleaseYear[];
  seasonsInfo?: ApiSeasonInfo[];
  persons: ApiPerson[];
  sequelsAndPrequels: ApiSimilarAndSequelsMovie[];
  similarMovies: ApiSimilarAndSequelsMovie[];
  premiere: ApiPremiere | null;
  videos: ApiVideos | null;
  networks: {
    items: ApiNetwork[];
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiErrorResponse {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

//Типы для нормализации данных
type ExternalId = { imdb: string | null };
type Backdrop = { url: string };
type Genre = { name: string };
type Country = { name: string };
type Votes = { kp: number; imdb: number };
type Rating = { kp: number; imdb: number };
type ReleaseYears = { start: number; end: number };
type SeasonInfo = { number: number; episodesCount: number };

export interface Person {
  id: number;
  name: string;
  photo: string;
  role: string;
  description: string;
}

export interface SimilarAndSequelsMovie {
  id: number;
  name: string;
  alternativeName?: string;
  rating: Rating;
  type: string;
  year: number;
  poster: {
    url: string;
  };
}

export interface MovieData {
  id: number;
  name: string;
  alternativeName: string | null;
  year: number;
  releaseYears?: ReleaseYears[];
  description: string | null;
  ageRating: number | null;
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
  backdrop?: Backdrop | null;
  logo?: {
    url: string | null;
    previewUrl: string | null;
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
  persons?: Person[];
  sequelsAndPrequels?: SimilarAndSequelsMovie[];
  similarMovies?: SimilarAndSequelsMovie[];
}

export interface MovieCardData {
  id: number;
  title: string;
  alternativeTitle?: string;
  type: string;
  year: number;
  rating: number;
  posterUrl: string;
  countries: string[];
  genres: string[];
}
