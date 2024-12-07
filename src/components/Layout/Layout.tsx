import { Outlet, useLocation } from 'react-router-dom';

import styles from './Layout.module.scss';
import { Header } from '../header';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  const location = useLocation();

  const visible =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className={styles.layout}>
      <ToastContainer />
      <ScrollToTop />
      {!visible && <Header />}
      <div className={styles.layout__content}>
        <Outlet />
      </div>
    </div>
  );
};
