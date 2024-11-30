import { useEffect, useRef, useState } from "react";

export const useOptimizedScroll = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [isDimmed, setIsDimmed] = useState(false);

  const lastScrollY = useRef(0); // Хранение прошлого значения прокрутки
  const ticking = useRef(false); // Флаг для requestAnimationFrame

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Затемнение полей
          if (currentScrollY > 5) {
            setIsDimmed(true);
          } else {
            setIsDimmed(false);
          }

          // Скрытие/появление поиска
          if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
            setShowSearch(true);
          } else if (currentScrollY > 5) {
            setShowSearch(false);
          }

          lastScrollY.current = currentScrollY; // Обновляем значение прокрутки
          ticking.current = false;
        });

        ticking.current = true; // Устанавливаем флаг, пока requestAnimationFrame работает
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { showSearch, isDimmed };
};
