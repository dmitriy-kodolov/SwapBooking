/* eslint-disable no-duplicate-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { restPost, restGet } from 'api/instances/main';
import { fetchActiveOffer, setBook } from '../../store/slices/exchangesSlice';
import { setAlert } from '../../store/slices/alertSlice';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    margin: '15px',
  },
});

const ActiveOffers = () => {
  const dispatch = useDispatch();
  const userId = useSelector(((state) => state.login.userId));
  const style = useStyle();
  const [step, setStep] = useState(1);
  const [masOfIdExchange, setMasOfIdExchange] = useState([]);
  const exchange = useSelector((state) => state.exchanges.activeOffer);
  const activeOfferIsLoading = useSelector((state) => state.exchanges.activeOfferIsLoading);
  const [isAcceptUserStepOne, setIsAcceptUserStepOne] = useState(false);
  const [isAcceptUserStepTwo, setIsAcceptUserStepTwo] = useState(false);
  const [isAcceptUserStepThree, setIsAcceptUserStepThree] = useState(false);
  const [isAcceptContrUserStepOne, setIsAcceptContrUserStepOne] = useState(false);
  const [isAcceptContrUserStepTwo, setIsAcceptContrUserStepTwo] = useState(false);
  const [isAcceptContrUserStepThree, setIsAcceptContrUserStepThree] = useState(false);

  switch (exchange?.OtherBook?.StatusID) {
    case 2:
      setIsAcceptContrUserStepOne(true);
      break;
    case 3:
      setIsAcceptContrUserStepTwo(true);
      break;
    case 4:
      setIsAcceptContrUserStepThree(true);
      break;
    default:
      break;
  }

  const propsFrom = useForm();
  const {
    handleSubmit, control,
  } = propsFrom;
  const formValues = propsFrom?.getValues();
  // получение  id активных обменов
  useEffect(() => {
    restGet(`/api/exchange/${userId}/all`)
      .then(({ data }) => {
        setMasOfIdExchange(data);
      })
      .catch((err) => dispatch(setAlert({ text: `Не удалось загрузить список, ${err.message}`, severity: 'error' })));
  }, []);

  // получение конкретного обмена
  useEffect(async () => {
    if (!activeOfferIsLoading
      && !Object.keys(exchange || {})?.length && masOfIdExchange?.length) {
      try {
        await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
      } catch (err) {
        dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
      }
    }
  }, [masOfIdExchange, exchange, userId]);

  // отпарвка трек номера
  const onSubmitForm = useCallback(() => {
    console.log(formValues);
    restPost(`/api/exchange/send/${userId}/${masOfIdExchange[0]}`, formValues)
      .then(async () => {
        setIsAcceptUserStepTwo(true);
        try {
          await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
        } catch (err) {
          dispatch(setAlert({ text: `Не удалось получить статус обмена ${err.message}`, severity: 'error' }));
        }
        if (isAcceptContrUserStepTwo) {
          setStep((prev) => prev + 1);
        }
      })
      .catch((err) => {
        dispatch(setAlert({ text: `Ошибка при отправки данных, попробуйте позже ${err.message}`, severity: 'error' }));
      });
  }, [formValues, userId, masOfIdExchange]);

  const book = useSelector((state) => state.exchanges.selectedBook);

  const handleCancel = useCallback(() => {
    dispatch(setBook());
  });

  if (!masOfIdExchange?.length) {
    return (<p>У вас нет активного обмена</p>);
  }

  return (
    <div className={style.root}>
      <Box sx={{ position: 'absolute', left: 16 }}>
        <Button variant="contained" color="info" onClick={handleCancel}>Отмена</Button>
      </Box>
      <Typography variant="h6">{`Карточка обмена ${book ? book.BookName : ''}`}</Typography>
      <div className={style.container}>
        <Card
          elevation={4}
          sx={{
            width: 370,
            minHeight: 400,
            m: 2,
          }}
        >
          <CardContent>
            <Typography align="center" variant="h6" component="div">
              Мне
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              Тут должна быть хотелка какая-то
              {exchange?.OtherBook?.BookName}
              {exchange?.OtherBook?.Note}
              {exchange?.OtherBook?.AuthorFirstName}
              {exchange?.OtherBook?.AuthorLastName}
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              {isAcceptContrUserStepOne && <p>Обмен подтвержден</p> }
              {!isAcceptContrUserStepOne && <p>Обмен не подтвержден</p> }
              <br />
              {isAcceptContrUserStepTwo && step === 2 && (
                <>
                  <p>Номер отправления</p>
                  <p>{exchange?.OtherBook?.TrackNumber}</p>
                </>
              )}
              {!isAcceptContrUserStepTwo && step === 2 && (
                <p>Книга пока не отправлена</p>
              )}
              {isAcceptContrUserStepThree && step === 3 && (
                <p>Книга получена</p>
              )}
              {!isAcceptContrUserStepThree && step === 3 && (
              <>
                <p>Номер отправления</p>
                <p>{exchange?.OtherBook?.TrackNumber}</p>
                <p>Книга не получена</p>
              </>
              )}
            </Typography>
          </CardContent>
        </Card>
        <Card
          elevation={4}
          sx={{
            width: 370,
            minHeight: 400,
            m: 2,
          }}
        >
          <CardContent>
            <Typography align="center" variant="h6" component="div">
              Я
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              Здесь то что пользователь будет менять:
              {exchange?.MyBook?.BookName}
              {exchange?.MyBook?.Note}
              {exchange?.MyBook?.AuthorFirstName}
              {exchange?.MyBook?.AuthorLastName}
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              {isAcceptUserStepOne && <p>Обмен подтвержден</p>}
              <br />
              {!isAcceptUserStepOne
              && step === 1 && (
              <Button
                variant="contained"
                // здесь отправка подтверждения обмена
                onClick={() => {
                  restPost(`/api/exchange/agree/${userId}/${masOfIdExchange[0]}`)
                    .then(async () => {
                      setIsAcceptUserStepOne(true);
                      try {
                        await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
                      } catch (err) {
                        dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
                      }
                      if (isAcceptContrUserStepOne) {
                        setStep((prev) => prev + 1);
                      }
                    })
                    .catch((err) => dispatch(setAlert({ text: 'Не удалось подтвердить обмен', severity: 'error' })));
                }}
                size="small"
              >
                Подтвердить
              </Button>
              )}
              {!isAcceptUserStepTwo && step === 2
              && (
              // здесь отправка трек номера
              <form
                onSubmit={(event) => { handleSubmit(onSubmitForm)(event); }}
                className={style.root}
              >
                <Input
                  rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 14,
                      message: 'Не больше 14-ти символов',
                    },
                    minLength: {
                      value: 14,
                      message: 'Не менее 14-ти символов',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Только цифры',
                    },
                  }
                }
                  control={control}
                  label="Номер отправления*"
                  name="number_order"
                />
                <Button
                  className={style.btn}
                  variant="contained"
                  type="submit"
                >
                  Отправил
                </Button>
              </form>
              )}
              {isAcceptUserStepTwo && step === 2 && (
              <>
                <p>Номер отправления</p>
                <p>{exchange?.MyBook?.TrackNumber}</p>
              </>
              )}
              {!isAcceptUserStepThree && step === 3 && (
              <>
                <p>Номер отправления</p>
                <p>{exchange?.MyBook?.TrackNumber}</p>
                <Button
                  className={style.btn}
                  variant="contained"
                  onClick={() => {
                    restPost(`/api/exchange/receive/${userId}/${masOfIdExchange[0]}`)
                      .then(() => {
                        setIsAcceptUserStepThree(true);
                      })
                      .catch((err) => dispatch(setAlert({ text: `Не удалось подтвердить получение, попробуйте позже ${err.message}`, severity: 'error' })));
                  }}
                >
                  Поулчил
                </Button>
              </>
              )}
              {isAcceptUserStepThree && step === 3 && (
                <p>Книга получена</p>
              )}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
          } catch (err) {
            dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
          }
        }}
      >
        Обновить статус обмена
      </Button>
    </div>
  );
};
export default ActiveOffers;
