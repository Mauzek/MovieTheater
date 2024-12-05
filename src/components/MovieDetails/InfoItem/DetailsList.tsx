import { FC } from "react";
import { InfoItem } from "./InfoItem";
import styles from "./DetailsList.module.css";

interface DetailsListProps {
  data: {
    year: number;
    releaseYears?: { start: number; end: number }[];
    type: string;
    genres: { name: string }[];
    countries: { name: string }[];
    movieLength?: number;
    seriesLength?: number;
  };
}

const typeMapping: { [key: string]: string } = {
  movie: "фильм",
  anime: "аниме",
  cartoon: "мультфильм",
  "tv-series": "сериал",
  series: "сериал",
  "animated-series": "анимационный сериал",
};

export const DetailsList: FC<DetailsListProps> = ({ data }) => {
  const formatTime = (minutes: number | undefined): string => {
    if (!minutes) return "";
    if (minutes < 60) {
      return `${minutes} мин`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} ч ${remainingMinutes} мин`;
    }
  };

  const getReleaseYearDisplay = (): string => {
    if (data.releaseYears && data.releaseYears.length > 0) {
      const { start, end } = data.releaseYears[0];
      return start !== end ? `${start} - ${end > 0 ? end : "..."}` : `${start}`;
    }
    return `${data.year}`;
  };

  const getTypeDisplay = (): string => {
    return typeMapping[data.type] || data.type;
  };

  const items = [
    { label: "Год выпуска:", value: getReleaseYearDisplay() },
    { label: "Тип:", value: getTypeDisplay() },
    {
      label: "Жанры:",
      value: data.genres.map((genre) => genre.name).join(", "),
    },
    {
      label: "Страны:",
      value: data.countries.map((country) => country.name).join(", "),
    },
    data.movieLength && {
      label: "Длина фильма:",
      value: formatTime(data.movieLength),
    },
    data.seriesLength && {
      label: "Длина серии:",
      value: formatTime(data.seriesLength),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <dl className={styles.detailsList}>
      {items.map((item, index) => (
        <InfoItem key={index} label={item.label} value={item.value} />
      ))}
    </dl>
  );
};
