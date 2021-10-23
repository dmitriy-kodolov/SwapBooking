import BookIcon from '@material-ui/icons/Book';
import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { restGet } from '../../api/instances/main';
import Auth from '../../components/Auth';
import Registered from '../../components/Registered';
import {
  logOut,
  authOpen,
  authClose,
  loginError,
  loginStart,
} from '../../store/slices/loginSlice';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const [isOpenAuth, setOpenAuth] = useState(false);
  const isAuthModalOpen = useSelector((state) => state.login.isAuthModalOpen);

  useEffect(() => {
    setOpenAuth(isAuthModalOpen);
  }, [isAuthModalOpen]);

  const handleAuthOpen = useCallback(() => {
    setOpenAuth(true);
    if (!isAuthModalOpen) {
      dispatch(authOpen());
    }
  }, [isAuthModalOpen]);

  const handleAuthClose = useCallback(() => setOpenAuth(false), []);

  const [isOpenRegistered, setOpenRegistered] = useState(false);
  const handleRegisteredOpen = useCallback(() => setOpenRegistered(true), []);
  const handleRegisteredClose = useCallback(() => setOpenRegistered(false), []);

  const hangleLogOut = React.useCallback(() => {
    dispatch(loginStart());
    restGet('/api/logout')
      .then((response) => {
        if (response.status === 200) {
          dispatch(logOut());
        } else {
          throw response;
        }
      }).catch((error) => {
        dispatch(loginError(error));
      });
  }, [dispatch]);

  const closeModal = useCallback(() => {
    handleAuthClose();
    handleRegisteredClose();
    dispatch(authClose());
  }, []);

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
  const name = useSelector((state) => state.profileInfo.userProfile?.[0]?.user_name);

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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="span" sx={{ paddingX: 2 }}>
                  {`Привет ${name}`}
                </Typography>
                <Button variant="contained" color="info" onClick={hangleLogOut}>Exit</Button>
              </Box>
            )
              : (
                <>
                  <Button variant="contained" color="info" onClick={handleAuthOpen}>Sign in</Button>
                </>
              )
          }
          <Auth
            close={closeModal}
            isOpen={isAuthModalOpen || (isOpenAuth && !isOpenRegistered)}
            toggleModal={toggleModal}
          />
          <Registered
            close={closeModal}
            isOpen={isAuthModalOpen && isOpenRegistered}
            toggleModal={toggleModal}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
