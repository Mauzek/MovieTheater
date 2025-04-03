import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavPanel.module.css";

export const NavPanel: FC = () => {
  const location = useLocation();
  const isPopularActive = location.pathname.startsWith('/popular');

  return (
    <nav className={styles.navPanel}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive && styles.navLinkActive }`
            }
          >
            Главная
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/popular/movies"
            className={
              `${styles.navLink} ${isPopularActive ? styles.navLinkActive : ""}`
            }
            end={false}
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
