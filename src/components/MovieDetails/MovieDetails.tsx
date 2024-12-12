import { FC, useEffect, useMemo } from "react";
import { MovieData, MovieImages } from "../../API/types";
import styles from "./MovieDetails.module.css";
import NotFound from "../../assets/images/notFound.gif";
import { RatingSection } from "./Rating/RatingSection";
import { Trailers } from "./Trailers/Trailers";
import { DetailsList } from "./InfoItem/DetailsList";
import { MoviePlayer } from "../MoviePlayer/MoviePlayer";
import { ActorsSection } from "./Actors/ActorsSection";
import { SequelsAndPrequelsSection } from "./SequelsAndPrequels/SequelsAndPrequelsSection";
import { SimilarMoviesSection } from "./SimilarMovies/SimilarMoviesSection";



interface MovieDetailsProps {
  movie: MovieData;
  images: MovieImages;
}

export const MovieDetails: FC<MovieDetailsProps> = ({ movie, images }) => {
  const uniqueTrailers = useMemo(() => {
    return movie.videos?.trailers?.filter(
      (trailer, index, self) =>
        self.findIndex((t) => t.url === trailer.url) === index
    );
  }, [movie.videos]);

  const getSeasonsInfo = useMemo(() => {
    if (!movie.seasonsInfo) {
      return { seasonsCount: 0, episodesCount: 0 };
    }

    let seasonsCount = 0;
    let episodesCount = 0;

    movie.seasonsInfo.forEach((season) => {
      if (season.number !== 0) {
        seasonsCount++;
        episodesCount += season.episodesCount;
      }
    });

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

  console.log(images.items)


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

          <RatingSection
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
            <SequelsAndPrequelsSection movies={moviesWithCurrent} />
            <hr className={styles.divider} />
          </>
        )}

        <MoviePlayer kinopoiskId={movie.id}/>
        <hr className={styles.divider} />

        {movie.persons && movie.persons.length > 0 && (
          <ActorsSection actors={movie.persons} />
        )}

        {movie.similarMovies && movie.similarMovies.length > 0 && (
          <>
            <hr className={styles.divider} />
            <SimilarMoviesSection movies={movie.similarMovies} />
          </>
        )}

       
      </article>
    </>
  );
};
