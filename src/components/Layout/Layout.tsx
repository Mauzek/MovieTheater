import { FC } from 'react';
import { SearchField } from '../SearchField/SearchField';
import { Outlet, useNavigate } from 'react-router-dom';

export const Layout: FC = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    const cleanedQuery = query.trim().replace(/\s+/g, '');
    navigate(`/search/${cleanedQuery.toLowerCase()}`);
  };

  const handleGoHome = () => {
    navigate('/popular/movies');
  };

  return (
    <>
      <SearchField onSearch={handleSearch} goHome={handleGoHome} />
      <Outlet />
    </>
  );
};
