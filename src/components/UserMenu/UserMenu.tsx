import React from 'react';
import { Select, MenuItem, Typography, FormControl } from '@mui/material';

interface UserMenuProps {
  username: string;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ username, onLogout }) => {
  return (
    <FormControl>
      <Select
        value={username}
        displayEmpty
        onChange={() => {}}
        renderValue={selected => (
          <Typography variant="body1" sx={{ textTransform: 'none' }}>
            {selected}
          </Typography>
        )}
        sx={{
          minWidth: 120,
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <MenuItem onClick={onLogout}>Log Out</MenuItem>
      </Select>
    </FormControl>
  );
};
