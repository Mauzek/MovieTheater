import { FC } from "react";
import { Collapse, ConfigProvider } from "antd";
import { Actor } from "./Actor";
import { Person } from "../../../API/api-utils";
import styles from "./Actor.module.css";

const { Panel } = Collapse;

interface ActorsSectionProps {
  actors: Person[];
}

export const ActorsSection: FC<ActorsSectionProps> = ({ actors }) => {
  return (
    <section className={styles.actorsSection}>
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerBg: "rgba(255, 255, 255, 0.1)",
              contentBg: "#191B22",
            },
          },
          token: {
            fontSize: 20,
            fontWeightStrong: 600,
            fontFamily: "Arial, sans-serif",
            colorText: "#ccc",
            colorBorder: "#7e85974f",
            fontSizeIcon: 20,
            motionDurationMid: "0.4s",
          },
        }}
      >
        <Collapse
          accordion
          defaultActiveKey={["1"]}
          expandIconPosition="end"
          style={{ width: "100%", fontWeight: 600 }}
        >
          <Panel header="Актеры" key="1">
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
          </Panel>
        </Collapse>
      </ConfigProvider>
    </section>
  );
};
