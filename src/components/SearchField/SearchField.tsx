import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "../../assets/icons/search-icon.svg";
import HomeIcon from "../../assets/icons/home-icon.svg";
import BackArrowIcon from "../../assets/icons/arrow_back.svg";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchField: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") return;
    navigate(`/search/${inputValue}`);
    setInputValue("");
  };

  const handleGoHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/popular/movies");
  };

  const handleGoBack = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSearch();
    }
  };

  const isOnPopularPage = location.pathname.startsWith("/popular/");

  return (
    <header className={`${styles.searchContainer}`}>
      <button
        className={`${styles.clickButton} ${styles.backButton}`}
        onClick={handleGoBack}
        style={{ display: isOnPopularPage ? "none" : "block" }}
      >
        <img src={BackArrowIcon} alt="Назад" />
      </button>
      <button
        className={`${styles.clickButton} ${styles.homeButton}`}
        onClick={handleGoHome}
      >
        <img src={HomeIcon} alt="Домой" />
      </button>

      <input
        type="text"
        className={`${styles.searchInput}`}
        placeholder="Введите название фильма..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={`${styles.clickButton} ${styles.searchButton}`}
        onClick={handleSearch}
      >
        <img src={SearchIcon} alt="Поиск" />
      </button>
    </header>
  );
};
