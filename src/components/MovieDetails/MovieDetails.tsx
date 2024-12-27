import { FC, useEffect, useMemo } from "react";
import { MovieData, MovieImages } from "../../API/types";
import { MoviePlayer } from "../";
import {
  RatingList,
  Trailers,
  DetailsList,
  ActorsList,
  SeqAndPreqList,
  SimilarMoviesList,
  MovieFrames,
} from "./";
import NotFound from "../../assets/images/notFound.gif";
import styles from "./MovieDetails.module.css";

interface MovieDetailsProps {
  movie: MovieData;
  images: MovieImages;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie, images }) => {
  const uniqueTrailers = useMemo(() => {
    const uniqueUrls = new Set();
    return movie.videos?.trailers?.filter((trailer) => {
      if (uniqueUrls.has(trailer.url)) {
        return false;
      }
      uniqueUrls.add(trailer.url);
      return true;
    });
  }, [movie.videos]);

  const getSeasonsInfo = useMemo(() => {
    if (!movie.seasonsInfo) {
      return { seasonsCount: 0, episodesCount: 0 };
    }

    const { seasonsCount, episodesCount } = movie.seasonsInfo
      .filter((season) => season.number !== 0)
      .reduce(
        (acc, season) => {
          acc.seasonsCount++;
          acc.episodesCount += season.episodesCount;
          return acc;
        },
        { seasonsCount: 0, episodesCount: 0 }
      );

    return { seasonsCount, episodesCount };
  }, [movie.seasonsInfo]);

  const { seasonsCount, episodesCount } = getSeasonsInfo;

  const backdropUrl = movie.backdrop?.url
    ? movie.backdrop?.url.replace(/\/orig$/, "/1920x1080")
    : movie.poster.url;

  const moviesWithCurrent = useMemo(() => {
    if (!movie.sequelsAndPrequels) return [];
    return [
      {
        id: movie.id,
        name: movie.name,
        alternativeName: movie.alternativeName ?? undefined,
        rating: movie.rating,
        type: movie.type,
        year: movie.year,
        poster: movie.poster,
      },
      ...movie.sequelsAndPrequels,
    ];
  }, [movie]);

  useEffect(() => console.log("Render"));

  return (
    <>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      />
      <div className={styles.gradient} />
      <article className={styles.movieDetail}>
        <section className={styles.mainInfo}>
          <header className={styles.posterContainer}>
            <div className={styles.posterWrapper}>
              <img
                src={movie.poster?.url || NotFound}
                alt={`${movie.name} poster`}
                className={styles.poster}
              />
            </div>
          </header>

          <section className={styles.details}>
            <h1 className={styles.movieTitle}>{movie.name}</h1>
            {movie.alternativeName && (
              <h2 className={styles.alternativeTitle}>
                {movie.alternativeName}
                {movie.ageRating && (
                  <span className={styles.ageRating}> +{movie.ageRating}</span>
                )}
              </h2>
            )}
            <DetailsList data={movie} />
          </section>

          <RatingList
            kpRating={movie.rating.kp}
            kpVotes={movie.votes.kp}
            imdbRating={movie.rating.imdb}
            imdbVotes={movie.votes.imdb}
            movieType={movie.type}
            movieId={movie.id}
            imdbId={movie.externalId?.imdb}
            seasons={seasonsCount}
            episodes={episodesCount}
          />
        </section>
        <hr className={styles.divider} />
        <section className={styles.descriptionContainer}>
          <header>
            <h2 className={styles.descriptionTitle}>Описание</h2>
          </header>
          <p className={styles.descriptionText}>
            {movie.description || "Описание недоступно."}
          </p>
        </section>
        <hr className={styles.divider} />

        <Trailers uniqueTrailers={uniqueTrailers} />
        <hr className={styles.divider} style={{ margin: "0px 0 32px " }} />

        {movie.sequelsAndPrequels && movie.sequelsAndPrequels.length > 1 && (
          <>
            <SeqAndPreqList movies={moviesWithCurrent} />
            <hr className={styles.divider} />
          </>
        )}

        <MoviePlayer kinopoiskId={movie.id} />
        <hr className={styles.divider} />

        {images && (
          <>
            <MovieFrames frames={images} />
            <hr className={styles.divider} style={{ margin: "0px 0 32px " }} />
          </>
        )}

        {movie.persons && movie.persons.length > 0 && (
          <ActorsList actors={movie.persons} />
        )}

        {movie.similarMovies && movie.similarMovies.length > 0 && (
          <>
            <hr className={styles.divider} />
            <SimilarMoviesList movies={movie.similarMovies} />
          </>
        )}
      </article>
    </>
  );
};
