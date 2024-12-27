import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavSearchIcon, NavHomeIcon, NavArrowIcon } from "../../assets";
import styles from "./SearchField.module.css";

export const SearchField: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/popular/movies");
  };

  const handleGoBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(-1);
  };

  const handleSearch = (inputValue: string) => {
    if (inputValue.trim() === "") return;
    navigate(`/search/${inputValue}`);
  };

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;

      if (window.scrollY > 50) {
        header.classList.add(styles.transparent);
      } else {
        header.classList.remove(styles.transparent);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isOnPopularPage = location.pathname.startsWith("/popular/");

  return (
    <header className={styles.searchContainer}>
      {!isOnPopularPage && (
        <button
          className={`${styles.clickButton} ${styles.backButton}`}
          onClick={handleGoBack}
        >
          <img src={NavArrowIcon} alt="Назад" />
        </button>
      )}
      <button
        className={`${styles.clickButton} ${styles.homeButton}`}
        onClick={handleGoHome}
      >
        <img src={NavHomeIcon} alt="Домой" />
      </button>
      <input
        type="text"
        className={`${styles.searchInput}`}
        placeholder="Введите название фильма..."
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch((e.target as HTMLInputElement).value);
        }}
      />
      <button
        className={`${styles.clickButton} ${styles.searchButton}`}
        onClick={(e) => {
          const input = e.currentTarget
            .previousElementSibling as HTMLInputElement;
          handleSearch(input.value);
        }}
      >
        <img src={NavSearchIcon} alt="Поиск" />
      </button>
    </header>
  );
};
