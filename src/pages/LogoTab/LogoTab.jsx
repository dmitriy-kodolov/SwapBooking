import BookIcon from '@material-ui/icons/Book';
import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Auth from '../../components/Auth';

export default function ButtonAppBar() {
  const [isOpenAuth, setOpenAuth] = useState(false);
  const handleAuthOpen = useCallback(() => setOpenAuth(true), []);
  const handleAuthClose = useCallback(() => setOpenAuth(false), []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <BookIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Swap Booking
          </Typography>
          <Button color="inherit" onClick={handleAuthOpen}>Авторизоваться</Button>
          <Button color="inherit">Зарегистрироваться</Button>
          <Auth close={handleAuthClose} isOpen={isOpenAuth} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
