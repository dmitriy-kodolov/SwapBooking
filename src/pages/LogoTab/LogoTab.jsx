import BookIcon from '@material-ui/icons/Book';
import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '../../components/Auth';
import Registered from '../../components/Registered';
import { logOut } from '../../store/slices/loginSlice';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const [isOpenAuth, setOpenAuth] = useState(false);
  const handleAuthOpen = useCallback(() => setOpenAuth(true), []);
  const handleAuthClose = useCallback(() => setOpenAuth(false), []);

  const [isOpenRegistered, setOpenRegistered] = useState(false);
  const handleRegisteredOpen = useCallback(() => setOpenRegistered(true), []);
  const handleRegisteredClose = useCallback(() => setOpenRegistered(false), []);

  const isLogin = useSelector((state) => state.login.isLogin);

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
          {
            isLogin ? (
              <div>
                Привет Вася
                <Button color="inherit" onClick={() => dispatch(logOut())}>Exit</Button>
              </div>
            )
              : (
                <>
                  <Button color="inherit" onClick={handleAuthOpen}>Авторизоваться</Button>
                  <Button color="inherit" onClick={handleRegisteredOpen}>Зарегистрироваться</Button>
                </>
              )
          }
          <Auth close={handleAuthClose} isOpen={isOpenAuth} />
          <Registered close={handleRegisteredClose} isOpen={isOpenRegistered} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
