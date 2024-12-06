import { FC } from 'react';
import { SequelsAndPrequelsItem } from './SequelsAndPrequelsItem';
import { SimilarAndSequelsMovie } from '../../../API/api-utils';
import styles from './SequelsAndPrequels.module.css';

interface SequelsAndPrequelsSectionProps {
  movies: SimilarAndSequelsMovie[];
}

export const SequelsAndPrequelsSection: FC<SequelsAndPrequelsSectionProps> = ({ movies }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Сиквелы и приквелы</h2>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <SequelsAndPrequelsItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
