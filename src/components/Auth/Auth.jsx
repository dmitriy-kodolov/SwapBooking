import * as React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { logIn, loginStart } from '../../store/slices/loginSlice';
import { restPost } from '../../api/instances/main';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35ch',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  '& .MuiTypography-root': { ml: 1, mb: 2 },
  '& .MuiTextField-root': { m: 1, width: '30ch', mb: 2 },
  '& .MuiCardActions-root': { ml: 2 },
};

export default function Auth({ close, isOpen, toggleModal }) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.login.isLoading);

  const submit = React.useCallback(() => {
    dispatch(loginStart());
    restPost('http://localhost/user', { login, password })
      .then((response) => {
        if (response.status === 200) {
          dispatch(logIn(response.data));
          close();
        }
      }).catch((error) => {
        console.log(error);
        setTimeout(() => {
          dispatch(logIn({
            login,
            password,
            name: 'name',
            lastname: 'lastname',
            fatherName: 'fatherName',
            email: 'email',
            index: 'index',
            city: 'city',
            street: 'street',
            numberHome: 'numberHome',
            district: 'district',
            numberRoom: 'numberRoom',
          }));
          close();
        }, 2000);
      });
  }, [dispatch, login, password]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Card
          sx={style}
          component="form"
          autoComplete="off"
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Авторизация
            </Typography>
            <TextField
              id="login"
              label="Логин"
              variant="outlined"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
              id="password"
              label="Пароль"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </CardContent>
          <CardActions>
            <LoadingButton
              size="small"
              variant="contained"
              onClick={submit}
              disabled={!login || !password}
              loading={isLoading}
            >
              Войти
            </LoadingButton>
            <Button size="small" onClick={toggleModal}>Регистрация</Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

Auth.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
