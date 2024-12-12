import { FC } from "react";
import { Person } from "../../../API/types";
import styles from "./Actor.module.css";

interface ActorProps {
  actor: Person;
}

export const Actor: FC<ActorProps> = ({ actor }) => {
  return (
    <article className={styles.actor}>
      <a
        href={`https://www.kinopoisk.ru/name/${actor.id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={styles.actorPhoto} src={actor.photo} alt={actor.name} />
        <p className={styles.actorName}>{actor.name}</p>
        <p className={styles.actorRole}>{actor.description }</p>
      </a>
    </article>
  );
};
