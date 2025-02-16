import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavPanel.module.css";

export const NavPanel: FC = () => {
  return (
    <nav className={styles.navPanel}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Главная
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/popular/movies"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Популярные
          </NavLink>
        </li>

        <li className={styles.navItem}>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            Каталог
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
