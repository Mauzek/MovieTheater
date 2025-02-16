import { FC } from 'react';
import { Outlet, useLocation} from 'react-router-dom';
import { NavPanel, SearchField } from '../';

export const Layout: FC = () => {
  const location = useLocation();
  const shouldHideNavPanel = ['/movies/', '/series/', '/search'].some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <>
      <SearchField />
      {!shouldHideNavPanel && <NavPanel />}
      <Outlet />
    </>
  );
};
