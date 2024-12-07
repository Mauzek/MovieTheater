import { FC } from "react";
import { Collapse, ConfigProvider } from "antd";
import { Actor } from "./Actor";
import { Person } from "../../../API/api-utils";
import styles from "./Actor.module.css";

interface ActorsSectionProps {
  actors: Person[];
}

export const ActorsSection: FC<ActorsSectionProps> = ({ actors }) => {
  const items = [
    {
      key: '1',
      label: 'Актеры',
      children: (
        <div className={styles.actorsList}>
          {actors.map((actor) => (
            <Actor
              key={actor.id}
              id={actor.id}
              name={actor.name}
              photo={actor.photo}
              role={actor.description}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className={styles.actorsSection}>
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
          bordered={false}
          style={{ width: "100%", fontWeight: 600 }}
          items={items}
        />
      </ConfigProvider>
    </section>
  );
};
