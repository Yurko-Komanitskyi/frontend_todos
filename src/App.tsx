import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { ListPage } from './pages/ListPage/ListPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { CreatePage } from './pages/CreatePage/CreatePage';
import PersistLogin from './components/Login/PersistLogin';
import RequireAuth from './components/Login/RequireAuth';
import RequireUnAuth from './components/Login/RequireUnAuth';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route index element={<HomePage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="create" element={<CreatePage />} />
          </Route>
          <Route element={<RequireUnAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
