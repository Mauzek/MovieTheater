const BASE_URLS = {
  kinopoisk: "https://api.kinopoisk.dev/v1.4/movie",
  moviePlayer: "https://kinobox.tv/api/players",
  popularMovies: "https://kp.kinobox.tv/api/v2/films/popular",
  searchMovies: "https://kp.kinobox.tv/films/search",
  kinopoisk_v2: "https://kinopoiskapiunofficial.tech/api/v2.2",
};

const API_KEYS = {
  kinopoisk: "TKKY3TV-A904ZTB-MXNTQY0-SJ9NYFQ",
  kinopoisk_2: "VGP6NKR-5QG40VA-QCNAG1G-HT7P67V",
  kinopoisk_3: "VBY5519-WKA4BJJ-J03MDYZ-ZRPRBV7",
  kinopoisk_v2: "81b4f69d-cb84-4a89-a1f6-984e450bbb7e",
  kinopoisk_v2_2: "35bdecc8-d5ad-4043-b513-1fcd6c94943f",
};

const endpoints = {
  searchMovies2: (query: string)=> `${BASE_URLS.searchMovies}?query=${query}`,
  searchMovies: (page: number, limit: number, query: string) =>
    `${BASE_URLS.kinopoisk}/search?page=${page}&limit=${limit}&query=${query}`,
  getMovieById: (id: string) => `${BASE_URLS.kinopoisk}/${id}`,
  getPopularMovies: (type: "film" | "series") =>
    `${BASE_URLS.popularMovies}?type=${type}`,
  getMoviePlayer: (kinopoiskId: number) =>
    `${BASE_URLS.moviePlayer}?kinopoisk=${kinopoiskId}`,
  getMovieImagesById: (kinopoiskId: number, page: number) =>
    `${BASE_URLS.kinopoisk_v2}/films/${kinopoiskId}/images?page=${page}`,
};

export { BASE_URLS, API_KEYS, endpoints };
