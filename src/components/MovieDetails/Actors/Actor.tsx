import { FC } from "react";
import styles from "./Actor.module.css";

interface ActorProps {
  id: number;
  name: string;
  photo: string;
  role: string;
}

export const Actor: FC<ActorProps> = ({ id, name, photo, role }) => {
  return (
    <article className={styles.actor}>
      <a
        href={`https://www.kinopoisk.ru/name/${id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.actorPhoto} src={photo} alt={name} />
        <p className={styles.actorName}>{name}</p>
        <p className={styles.actorRole}>{role}</p>
      </a>
    </article>
  );
};
