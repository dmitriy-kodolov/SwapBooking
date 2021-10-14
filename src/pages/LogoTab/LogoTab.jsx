/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import BookIcon from '@material-ui/icons/Book';
import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from 'pages/NavBar/NavBar';
import { makeStyles } from '@material-ui/styles';
import Auth from '../../components/Auth';
import Registered from '../../components/Registered';
import { logOut } from '../../store/slices/loginSlice';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '190px',
  },
  auth: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '190px',
  },
});
export default function ButtonAppBar() {
  const style = useStyle();
  const dispatch = useDispatch();
  const [isOpenAuth, setOpenAuth] = useState(false);
  const handleAuthOpen = useCallback(() => setOpenAuth(true), []);
  const handleAuthClose = useCallback(() => setOpenAuth(false), []);

  const [isOpenRegistered, setOpenRegistered] = useState(false);
  const handleRegisteredOpen = useCallback(() => setOpenRegistered(true), []);
  const handleRegisteredClose = useCallback(() => setOpenRegistered(false), []);

  const toggleModal = useCallback(() => {
    if (isOpenRegistered) {
      handleRegisteredClose();
      handleAuthOpen();
    }

    if (isOpenAuth) {
      handleAuthClose();
      handleRegisteredOpen();
    }
  }, [isOpenRegistered, isOpenAuth]);

  const isLogin = useSelector((state) => state.login.isLogin);
  const name = useSelector((state) => state.login.profile?.name);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={style.root}>
          <div className={style.root}>
            <div className={style.logo}>
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
            </div>
            <NavBar />
            <div className={style.auth}>
              {
            isLogin ? (
              <div className={style.auth}>
                {/* Привет Чувак
                {name} */}
                <Button
                  sx={{
                    margin: '5px',
                  }}
                  color="inherit"
                  variant="outlined"
                  onClick={() => dispatch(logOut())}
                >
                  Выйти

                </Button>
              </div>
            )
              : (
                <div className={style.auth}>
                  <Button
                    sx={{
                      margin: '5px',
                    }}
                    variant="outlined"
                    color="inherit"
                    onClick={handleAuthOpen}
                  >
                    Авторизоваться
                  </Button>
                  <Button
                    sx={{
                      margin: '5px',
                    }}
                    variant="outlined"
                    color="inherit"
                    onClick={handleRegisteredOpen}
                  >
                    Зарегистрироваться

                  </Button>
                </div>
              )
          }
            </div>
          </div>
        </Toolbar>
        <Auth close={handleAuthClose} isOpen={isOpenAuth} toggleModal={toggleModal} />
        <Registered
          close={handleRegisteredClose}
          isOpen={isOpenRegistered}
          toggleModal={toggleModal}
        />
      </AppBar>
    </Box>
  );
}
