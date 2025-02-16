import React from "react";
import styles from "./Rating.module.css";

interface RatingProps {
  label: string;
  rating: number;
  votes: number;
  icon: string;
  link: string;
}

export const Rating: React.FC<RatingProps> = ({
  label,
  rating,
  votes,
  icon,
  link,
}) => (
    <a
      className={styles.rating}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={`${styles[`label${label}`]}`}>
        <img src={icon} alt={label} />
      </span>

      <span className={styles.ratingText}>{rating}</span>
      <div className={styles.votes}>
        <span>{votes.toLocaleString("ru-RU")} оценок</span>
      </div>
    </a>
);
