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
import { restPost, restGet, restDelete } from 'api/instances/main';
import { fetchActiveOffer, setBook, fetchAllOffersId } from '../../store/slices/exchangesSlice';
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
  listCategory: {
    listStyle: 'none',
    paddingLeft: '0',
  },
});

const ActiveOffers = () => {
  const dispatch = useDispatch();
  const userId = useSelector(((state) => state.login.userId));
  const style = useStyle();
  const exchange = useSelector((state) => state.exchanges.activeOffer);
  const activeOfferIsLoading = useSelector((state) => state.exchanges.activeOfferIsLoading);
  const activeOfferError = useSelector((state) => state.exchanges.activeOfferError);
  const masOfIdExchange = useSelector((state) => state.exchanges.allOffersId);
  const propsFrom = useForm();
  const {
    handleSubmit, control,
  } = propsFrom;
  const formValues = propsFrom?.getValues();
  // получение  id активных обменов
  useEffect(async () => {
    try {
      await dispatch(fetchAllOffersId(userId)).unwrap();
    } catch (err) {
      dispatch(setAlert({ text: `Не удалось загрузить список, ${err.message}`, severity: 'error' }));
    }
  }, []);
  // получение конкретного обмена
  useEffect(async () => {
    if (!activeOfferIsLoading
      && !Object.keys(exchange || {})?.length && masOfIdExchange?.length && !activeOfferError) {
      try {
        await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
      } catch (err) {
        dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
      }
    }
  }, [masOfIdExchange, exchange, userId]);

  // отпарвка трек номера
  const onSubmitForm = (values) => {
    restPost(`/api/exchange/send/${userId}/${masOfIdExchange[0]}`, values)
      .then(async () => {
        try {
          await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
        } catch (err) {
          dispatch(setAlert({ text: `Не удалось получить статус обмена ${err.message}`, severity: 'error' }));
        }
      })
      .catch((err) => {
        dispatch(setAlert({ text: `Ошибка при отправки данных, попробуйте позже ${err.message}`, severity: 'error' }));
      });
  };

  const book = useSelector((state) => state.exchanges.selectedBook);
  // отменить обмен
  const handleCancel = useCallback(() => {
    dispatch(setBook());
  });

  // подтвердить
  const agreementHandler = async () => {
    try {
      await restPost(`/api/exchange/agree/${userId}/${masOfIdExchange[0]}`);
      await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
    } catch (err) {
      dispatch(setAlert({ text: `Не удалось подтвердить активный обмен ${err.message}`, severity: 'error' }));
    }
  };

  // кнопка получить
  const acceptDelivery = async () => {
    try {
      await restPost(`/api/exchange/receive/${userId}/${masOfIdExchange[0]}`);
      await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
    } catch (err) {
      dispatch(setAlert({ text: `Не удалось подтвердить получение ${err.message}`, severity: 'error' }));
    }
  };

  // кнопка обновить
  const updateExchangeStatus = async () => {
    try {
      await dispatch(fetchActiveOffer([userId, masOfIdExchange[0]])).unwrap();
    } catch (err) {
      dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
    }
  };
  if (activeOfferError) {
    return (<p>Ошибка обмена данными</p>);
  }
  if (!masOfIdExchange?.length) {
    return (<p>У вас нет активного обмена</p>);
  }
  return (
    <div className={style.root}>
      {((exchange?.OtherBook?.StatusID === 2 && exchange?.MyBook?.StatusID === 1)
      || (exchange?.OtherBook?.StatusID === 1 && exchange?.MyBook?.StatusID === 2))
      && (
        <Box sx={{ position: 'absolute', left: 16 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleCancel();
              try {
                restDelete(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
              } catch (err) {
                dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
              }
            }}
          >
            Отмена
          </Button>
        </Box>
      )}
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
              <b>Мне</b>
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listCategory}>
                <li>
                  {exchange?.OtherBook?.AuthorFirstName}
                  {' '}
                  {exchange?.OtherBook?.AuthorLastName}
                </li>
                <li>
                  {exchange?.OtherBook?.BookName}
                </li>
              </ul>
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              {exchange?.OtherBook?.StatusID === 1 && <p>{exchange?.OtherBook?.StatusText}</p>}
              {exchange?.OtherBook?.StatusID === 2 && <p>{exchange?.OtherBook?.StatusText}</p> }
              {exchange?.OtherBook?.StatusID === 2 && exchange?.OtherBook?.TrackNumber === ''
                && (
                <p>Книга еще не отправлена</p>
                )}
              {exchange?.OtherBook?.StatusID === 3 && exchange?.OtherBook?.TrackNumber === ''
                  && (
                  <p>Книга еще не отправлена</p>
                  )}

              {exchange?.OtherBook?.StatusID === 3 && exchange?.OtherBook?.TrackNumber !== ''
                    && (
                    <>
                      <p>{exchange?.OtherBook?.StatusText}</p>
                      <p>{exchange?.OtherBook?.TrackNumber}</p>
                    </>
                    )}
              {exchange?.OtherBook?.StatusID === 4 && <p>{exchange?.OtherBook?.StatusText}</p>}
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
              <b>Я</b>
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listCategory}>
                <li>
                  {exchange?.MyBook?.AuthorFirstName}
                  {' '}
                  {exchange?.MyBook?.AuthorLastName}
                </li>
                <li>
                  {exchange?.MyBook?.BookName}
                </li>
              </ul>
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              {exchange?.MyBook?.StatusID === 1
                  && (
                  <>
                    <p>{exchange?.MyBook?.StatusText}</p>
                    <Button
                      variant="contained"
                      onClick={agreementHandler}
                      size="small"
                    >
                      Подтвердить
                    </Button>
                  </>
                  )}
              {exchange?.MyBook?.StatusID === 2 && <p>{exchange?.MyBook?.StatusText}</p>}
              {(exchange?.MyBook?.StatusID === 2 && exchange?.MyBook?.TrackNumber === ''
              && exchange?.OtherBook?.StatusID !== 1)
              && (
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
                  name="TrackNumber"
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
              {exchange?.MyBook?.StatusID === 3 && exchange?.MyBook?.TrackNumber === ''
            && (
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
                name="TrackNumber"
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
              {exchange?.MyBook?.StatusID === 3 && exchange?.MyBook?.TrackNumber !== ''
                && (
                <>
                  <p>{exchange?.MyBook?.StatusText}</p>
                  <p>{exchange?.MyBook?.TrackNumber}</p>
                </>
                )}
              {exchange?.MyBook?.StatusID === 3 && exchange?.MyBook?.TrackNumber !== ''
              && exchange?.OtherBook?.StatusID === 3 && exchange?.OtherBook?.TrackNumber !== ''
              && (
                <Button
                  className={style.btn}
                  variant="contained"
                  onClick={acceptDelivery}
                >
                  Получил
                </Button>
              )}
              {exchange?.MyBook?.StatusID === 3 && exchange?.MyBook?.TrackNumber !== ''
              && exchange?.OtherBook?.StatusID === 4
              && (
              <Button
                className={style.btn}
                variant="contained"
                onClick={acceptDelivery}
              >
                Получил
              </Button>
              )}
              {exchange?.MyBook?.StatusID === 4 && <p>{exchange?.MyBook?.StatusText}</p>}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button
        variant="contained"
        onClick={updateExchangeStatus}
      >
        Обновить статус обмена
      </Button>
    </div>
  );
};
export default ActiveOffers;
