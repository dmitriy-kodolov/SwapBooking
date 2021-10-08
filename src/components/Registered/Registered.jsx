/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
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
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices/loginSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '68ch',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  '& .MuiTypography-root': { ml: 1, mb: 2 },
  '& .MuiTextField-root': { m: 1, width: '30ch', mb: 2 },
  '& .MuiCardActions-root': { ml: 2 },
};

const regExpCyrillic = new RegExp(/^[а-яА-Я]+$/);
// const regExpNumberHome = new RegExp(/^[0-9]+[а-яА-Я]?$/);
// const regExpDistrict = new RegExp(/^[а-яА-Я]?[0-9]{0,2}$/);
const regExpEmail = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/);

export default function Registered({ close, isOpen }) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [fatherName, setFatherName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [index, setIndex] = React.useState('');
  const [city, setCity] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [numberHome, setNumberHome] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [numberRoom, setNumberRoom] = React.useState('');
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(logIn());
    close();
  };

  const [errors, setErrors] = React.useState({});

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
              Регистрация
            </Typography>
            <div
              style={{
                display: 'flex', borderBottom: 'solid gray 1px', paddingBottom: '8px', marginBottom: '8px',
              }}
            >
              <div>
                <TextField
                  required
                  error={errors?.name}
                  id="name"
                  label="Имя"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.length > 25) {
                      setErrors((prevState) => ({ ...prevState, name: 'Ограничение 25 символов' }));
                    } else if (!regExpCyrillic.test(e.target.value)) {
                      setErrors((prevState) => ({ ...prevState, name: 'Только буквы кириллицы' }));
                    } else {
                      setErrors((prevState) => ({ ...prevState, name: null }));
                    }

                    setName(e.target.value);
                  }}
                  helperText={errors?.name || 'Только буквы кириллицы до 25 символов'}
                />
                <TextField
                  required
                  id="lastname"
                  label="Фамилия"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  id="father-name"
                  label="Отчество"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  helperText="Incorrect entry."
                />
              </div>
              <div>
                <TextField
                  required
                  error={errors?.email}
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setErrors((prevState) => ({ ...prevState, email: null }));
                    setEmail(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (!regExpEmail.test(e.target.value)) {
                      setErrors((prevState) => ({ ...prevState, email: 'нет @' }));
                    } else {
                      setErrors((prevState) => ({ ...prevState, email: null }));
                    }
                  }}
                  helperText={errors?.email || 'Incorrect entry.'}
                />
                <TextField
                  required
                  id="login"
                  label="Логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  required
                  id="password"
                  label="Пароль"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText="Incorrect entry."
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div>
                <TextField
                  required
                  id="index"
                  label="Индекс"
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  required
                  id="city"
                  label="Город"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  required
                  id="street"
                  label="Улица"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  helperText="Incorrect entry."
                />
              </div>
              <div>
                <TextField
                  required
                  id="number-home"
                  label="Номер дома"
                  value={numberHome}
                  onChange={(e) => setNumberHome(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  id="district"
                  label="Номер строения"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  helperText="Incorrect entry."
                />
                <TextField
                  id="number-room"
                  label="Номер квартиры"
                  value={numberRoom}
                  onChange={(e) => setNumberRoom(e.target.value)}
                  helperText="Incorrect entry."
                />
              </div>
            </div>
            {/* <TextField */}
            {/*  id="login" */}
            {/*  label="Введите ваш Логин" */}
            {/*  variant="outlined" */}
            {/*  value={login} */}
            {/*  onChange={(e) => setLogin(e.target.value)} */}
            {/* /> */}
            {/* <TextField */}
            {/*  id="password" */}
            {/*  label="Введите ваш Пароль" */}
            {/*  variant="outlined" */}
            {/*  type="password" */}
            {/*  value={password} */}
            {/*  onChange={(e) => setPassword(e.target.value)} */}
            {/* /> */}

          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={submit}
              disabled={!login || !password}
            >
              Регистрация
            </Button>
            <Button size="small">Войти</Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

Registered.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
