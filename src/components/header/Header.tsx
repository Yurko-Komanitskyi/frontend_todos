import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import styles from './Header.module.scss';
import { UserMenu } from '../UserMenu';
import useLogout from '../../Hooks/useLogout';
import { useAppSelector } from '../../Hooks/useAppSelector';

export const Header: React.FC = () => {
  const logOut = useLogout();
  const navigate = useNavigate();
  const auth = useAppSelector(state => state.auth.auth);

  const signOut = () => {
    logOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <AppBar position="static">
      <Toolbar className={styles.header}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavLink
            to="/list"
            style={({ isActive }) => ({
              color: isActive ? '#1976d2' : 'inherit',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <Button className={styles.header__navItem}>List</Button>
          </NavLink>
          <NavLink
            to="/create"
            style={({ isActive }) => ({
              color: isActive ? '#1976d2' : 'inherit',
              textDecoration: 'none',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <Button className={styles.header__navItem}>Create</Button>
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <UserMenu
            username={
              'user' in auth
                ? `${auth.user.name} ${auth.user.surname}`
                : 'Yusername'
            }
            onLogout={signOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
