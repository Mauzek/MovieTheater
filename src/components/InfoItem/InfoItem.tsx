import React from "react";
import styles from "../MovieDetails/MovieDetails.module.css";

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className={styles.infoItem}>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
);

