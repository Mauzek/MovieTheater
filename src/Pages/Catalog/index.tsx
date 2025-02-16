import { FC, useEffect, useState } from "react";
import { NormalizedCatalog } from "../../API/types";
import { getCatalog } from "../../API/api-utils";
import { MovieCardList, Preloader } from "../../components";
import { PopularIcon } from "../../assets";
import styles from "./Catalog.module.css";

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

  return (
    <main>
      {loading && <Preloader />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && catalog && (
        <>
          {["Film", "Series", "Animation"].map((key) => {
            if (!catalog[key as keyof NormalizedCatalog]) return null; // Пропускаем отсутствующие категории
            const titles: Record<string, string> = {
              Film: "Популярные фильмы",
              Series: "Популярные сериалы",
              Animation: "Популярные мультфильмы",
            };
            return (
              <div key={key}>
                <div className={styles.titleContainer}>
                    <img className={styles.categoryIcon} src={PopularIcon} alt="CatalogIcon" />
                  <h2 className={styles.titleCategory}>{titles[key]}</h2>
                
                </div>
                <MovieCardList
                  movies={catalog[key as keyof NormalizedCatalog]}
                />
              </div>
            );
          })}
        </>
      )}
    </main>
  );
};
