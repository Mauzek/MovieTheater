import { FC, useEffect, useState } from "react";
import { NormalizedCatalog } from "../../API/types";
import { getCatalog } from "../../API/api-utils";
import { MovieCardList, Preloader } from "../../components";
import { PopularIcon } from "../../assets";
import styles from "./Home.module.css";

export const CatalogPage: FC = () => {
  const [catalog, setCatalog] = useState<NormalizedCatalog>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalagog = async () => {
      setLoading(true);
      setError(null);
      try {
        const catalogData = await getCatalog();
        setCatalog(catalogData);
      } catch (error) {
        setError("Не удалось загрузить данные каталога.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCalagog();
  }, []);

  const categoryTitles: Record<string, string> = {
    Film: "Популярные фильмы",
    Series: "Популярные сериалы",
    Animation: "Популярные мультфильмы",
  };

  return (
    <main className={styles.mainContainer}>
      {loading && <Preloader />}
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      {!loading && !error && catalog && (
        <div className={styles.catalogSections}>
          {["Film", "Series", "Animation"].map((key) => {
            if (!catalog[key as keyof NormalizedCatalog]) return null;
            
            return (
              <section 
                key={key} 
                className={styles.categorySection}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.iconWrapper}>
                    <img className={styles.categoryIcon} src={PopularIcon} alt={`${key} icon`} />
                  </div>
                  <h2 className={styles.categoryTitle}>{categoryTitles[key]}</h2>
                </div>
                
                <MovieCardList
                  movies={catalog[key as keyof NormalizedCatalog]}
                />
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
};
