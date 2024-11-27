const BASE_URLS = {
  kinopoisk: "https://api.kinopoisk.dev/v1.4/movie",
  moviePlayer: "https://kinobox.tv/api/players",
  popularMovies: "https://kinobox.tv/api/films/popular",
};

const API_KEYS = {
  kinopoisk: "TKKY3TV-A904ZTB-MXNTQY0-SJ9NYFQ",
  kinopoisk_2: "VGP6NKR-5QG40VA-QCNAG1G-HT7P67V",
  kinopoisk_3: "VBY5519-WKA4BJJ-J03MDYZ-ZRPRBV7",
};

const endpoints = {
  searchMovies: (page: number, limit: number, query: string) =>
    `${
      BASE_URLS.kinopoisk
    }/search?page=${page}&limit=${limit}&query=${query}`,
  getMovieById: (id: string) => `${BASE_URLS.kinopoisk}/${id}`,
  getPopularMovies: (type: "film" | "series") =>
    `${BASE_URLS.popularMovies}?type=${type}`,
  getMoviePlayer: (kinopoiskId: number) =>
    `${BASE_URLS.moviePlayer}?kinopoisk=${kinopoiskId}`,
};

export { BASE_URLS, API_KEYS, endpoints };
