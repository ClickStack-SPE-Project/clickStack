import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Click Stack
        </Typography>
        <div>
          <AccountCircle />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
