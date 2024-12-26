import { FC } from "react";
import { SeqAndPreqItem } from "./SeqAndPreqItem";
import { SimilarAndSequelsMovie } from "../../../API/types";
import { Collapse, ConfigProvider } from "antd";
import styles from "./SequelsAndPrequels.module.css";

interface SequelsAndPrequelsSectionProps {
  movies: SimilarAndSequelsMovie[];
}

export const SeqAndPreqList: FC<SequelsAndPrequelsSectionProps> = ({
  movies,
}) => {
  const sortedMovies = movies.sort((a, b) => a.year - b.year);
  const items = [
    {
      key: "1",
      label: "Сиквелы и приквелы",
      children: (
        <div className={styles.movieList}>
          {sortedMovies.map((movie) => (
            <SeqAndPreqItem key={movie.id} movie={movie} />
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
