import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./SearchField.module.css";
import SearchIcon from "../../assets/icons/search-icon.svg";
import HomeIcon from "../../assets/icons/home-icon.svg"

interface SearchFieldProps {
  onSearch: (value: string) => void;
  goHome: () => void;
}

export const SearchField: FC<SearchFieldProps> = ({ onSearch, goHome }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim() === "") return;
  
    if (onSearch) {
      onSearch(inputValue);
    }
    setInputValue("");
  };
  
  const handleGoHome = () => {
    if (goHome) {
      goHome();
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <button className={styles.clickButton} onClick={handleGoHome}>
        <img src={HomeIcon} alt="Домой" />
      </button>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Введите название фильма..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.clickButton} onClick={handleSearch}>
        <img src={SearchIcon} alt="Поиск" />
      </button>
    </div>
  );
};
