import { FC } from 'react';
import { SequelsAndPrequelsItem } from './SequelsAndPrequelsItem';
import { SimilarAndSequelsMovie } from '../../../API/api-utils';
import styles from './SequelsAndPrequels.module.css';
import { Collapse, ConfigProvider } from "antd";

interface SequelsAndPrequelsSectionProps {
  movies: SimilarAndSequelsMovie[];
}

export const SequelsAndPrequelsSection: FC<SequelsAndPrequelsSectionProps> = ({ movies }) => {
  const sortedMovies = movies.sort((a, b) => a.year - b.year);
  const items = [
    {
      key: '1',
      label: 'Сиквелы и приквелы',
      children: (
        <div className={styles.movieList}>
          {sortedMovies.map((movie) => (
            <SequelsAndPrequelsItem key={movie.id} movie={movie} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className={styles.section}>
      <ConfigProvider
        theme={{
          token: {          
            fontFamily: "Arial, sans-serif",
            motionDurationMid: "0.4s",
          },
        }}
      >
        <Collapse
          accordion
          expandIconPosition="end"
          defaultActiveKey={"1"}
          bordered={false}
          style={{ width: "100%", fontWeight: 600 }}
          items={items}
        />
      </ConfigProvider>
    </section>
  );
};
