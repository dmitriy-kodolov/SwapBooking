/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-duplicate-case */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { restPost, restGet } from 'api/instances/main';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    margin: '15px',
  },
  listOfBook: {
    listStyle: 'none',
  },
});

const Test = () => {
  const userId = useSelector(((state) => state.login.userId));
  const style = useStyle();
  const [masOfIdExchange, setMasOfIdExchange] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const propsFrom = useForm();
  const {
    handleSubmit, control,
  } = propsFrom;
  const formValues = propsFrom?.getValues();
  // получение   активных обменов
  useEffect(() => {
    (async () => {
      try {
        const resultGet = await restGet(`/api/exchange/${userId}/all`);
        setMasOfIdExchange(resultGet.data);
        if (!masOfIdExchange.length) {
          setIsLoading(false);
          return;
        }
        const resultGetExchange = await restGet(`/api/exchange/${userId}/${resultGet.data[0]}`);
        setExchange(resultGetExchange.data);
        setIsLoading(false);
      } catch (error) {
        alert(`Не удалось ${error.message}`);
        setIsLoading(false);
        setError(true);
      }
    })();
  }, []);
  // подтвердить
  const agreementHandler = async () => {
    try {
      await restPost(`/api/exchange/agree/${userId}/${masOfIdExchange[0]}`);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
    } catch (error) {
      alert(`Не удалось ${error.message}`);
      setIsLoading(false);
      setError(true);
    }
  };
  // отпарвка трек номера
  const onSubmitForm = async () => {
    try {
      await restPost(`/api/exchange/send/${userId}/${masOfIdExchange[0]}`, formValues);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
    } catch (error) {
      alert(`Не удалось ${error.message}`);
      setIsLoading(false);
      setError(true);
    }
  };
  // кнопка получить
  const acceptDelivery = async () => {
    try {
      await restPost(`/api/exchange/receive/${userId}/${masOfIdExchange[0]}`);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
    } catch (error) {
      alert(`Не удалось ${error.message}`);
      setIsLoading(false);
      setError(true);
    }
  };

  // кнопка обновить
  const updateExchangeStatus = async () => {
    try {
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
    } catch (error) {
      alert(`Не удалось ${error.message}`);
      setIsLoading(false);
      setError(true);
    }
  };
  if (isLoading) {
    return (<p>Загрузка...</p>);
  }
  if (isError) {
    return (<p>Ошибка загрузки, попробуйте позже</p>);
  }
  if (!masOfIdExchange?.length) {
    return (<p>У вас нет списка активного обмена</p>);
  }
  return (
    <div className={style.root}>
      <p>Карточка обмена</p>
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
              <ul className={style.listOfBook}>
                <li>
                  {exchange?.OtherBook?.AuthorFirstName}
                  {' '}
                  {exchange?.OtherBook?.AuthorLastName}
                </li>
                <li>
                  {exchange?.OtherBook?.BookName}
                </li>
                <li>
                  {exchange?.OtherBook?.Note}
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
              Я
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listOfBook}>
                <li>
                  {exchange?.MyBook?.AuthorFirstName}
                  {' '}
                  {exchange?.MyBook?.AuthorLastName}
                </li>
                <li>
                  {exchange?.MyBook?.BookName}
                </li>
                <li>
                  {exchange?.MyBook?.Note}
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
               // здесь отправка подтверждения обмена */}
                  onClick={agreementHandler}
                  size="small"
                >
                  Подтвердить
                </Button>
              </>
              )}
              {exchange?.MyBook?.StatusID === 2 && <p>{exchange?.MyBook?.StatusText}</p>}
              {exchange?.MyBook?.StatusID === 2 && exchange?.MyBook?.TrackNumber === ''
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
                    x
                    label="Номер отправления*"
                    name="Track_number"
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
                    x
                    label="Номер отправления*"
                    name="Track_number"
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
                Поулчил
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
                Поулчил
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
export default Test;
