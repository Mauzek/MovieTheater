import { FC } from 'react';
import { SearchField } from '../SearchField/SearchField';
import { Outlet} from 'react-router-dom';

export const Layout: FC = () => {


  return (
    <>
      <SearchField  />
      <Outlet />
    </>
  );
};
