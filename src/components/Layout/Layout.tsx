import { FC } from 'react';
import { Outlet} from 'react-router-dom';
import { SearchField } from '../';

export const Layout: FC = () => {
  return (
    <>
      <SearchField />
      <Outlet />
    </>
  );
};
