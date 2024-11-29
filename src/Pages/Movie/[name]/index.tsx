import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieDetails } from "../../../components/MovieDetails/MovieDetails";
import { getMovieByID, MovieData } from "../../../API/api-utils";
import { Preloader } from "../../../components/Preloader/Preloader";

const Movie: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false); 

  useEffect(() => {
    if (!name || fetchedRef.current) return; 

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const movie: MovieData = await getMovieByID(name);
        setMovieData(movie); 
        const isSeries = movie.seriesLength && movie.seriesLength > 0 || (movie.seasonsInfo && movie.seasonsInfo.length > 0);
        const routeType = isSeries ? "series" : "movies";
        navigate(`/${routeType}/${movie.id}`, { replace: true });
        fetchedRef.current = true;
      } catch (error) {
        setError("Не удалось загрузить данные о фильме.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData(); 
  }, [name, navigate]); 

  return (
    <div>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      {movieData && <MovieDetails movie={movieData} />}
    </div>
  );
};

export default Movie;
