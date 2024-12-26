import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MovieDetails, Preloader } from "../../../components";
import { getMovieByID, getMovieImagesById } from "../../../API/api-utils";
import { MovieData, MovieImages } from "../../../API/types";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [movieImages, setMovieImages] = useState<MovieImages | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    fetchedRef.current = false;
    setMovieData(null);

    if (!id) return;

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const movie: MovieData = await getMovieByID(id);
        setMovieData(movie);
        const images: MovieImages = await getMovieImagesById(movie.id);
        setMovieImages(images);
        const isSeries = movie.seriesLength && movie.seriesLength > 0 || (movie.seasonsInfo && movie.seasonsInfo.length > 0);
        const routeType = isSeries ? "series" : "movies";
        if (location.pathname !== `/${routeType}/${movie.id}`) {
          navigate(`/${routeType}/${movie.id}`, { replace: true });
        }
        fetchedRef.current = true;
      } catch (error) {
        setError("Не удалось загрузить данные о фильме.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, navigate, location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      {movieData && movieImages && <MovieDetails movie={movieData} images={movieImages} />}
    </main>
  );
};

export default Movie;
