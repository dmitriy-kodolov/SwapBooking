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
});

const ActiveOffers = () => {
  const userId = useSelector(((state) => state.login.userId));
  const style = useStyle();
  const [step, setStep] = useState(1);
  const [masOfIdExchange, setMasOfIdExchange] = useState([]);
  const [exchange, setExchange] = useState([]);
  const [isAcceptUserStepOne, setIsAcceptUserStepOne] = useState(false);
  const [isAcceptUserStepTwo, setIsAcceptUserStepTwo] = useState(false);
  const [isAcceptUserStepThree, setIsAcceptUserStepThree] = useState(false);
  const [isAcceptContrUserStepOne, setIsAcceptContrUserStepOne] = useState(false);
  const [isAcceptContrUserStepTwo, setIsAcceptContrUserStepTwo] = useState(false);
  const [isAcceptContrUserStepThree, setIsAcceptContrUserStepThree] = useState(false);

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
        const resultGetExchange = await restGet(`/api/exchange/${userId}/${resultGet.data[0]}`);
        setExchange(resultGetExchange.data);
        if (resultGetExchange.data.OtherBook.StatusID === 2) {
          setIsAcceptContrUserStepOne(true);
        }
        if (resultGetExchange.data.OtherBook.StatusID === 3) {
          setIsAcceptContrUserStepTwo(true);
          setIsAcceptContrUserStepOne(true);
        }
        if (resultGetExchange.data.OtherBook.StatusID === 4) {
          setIsAcceptContrUserStepThree(true);
          setIsAcceptContrUserStepOne(true);
          setIsAcceptContrUserStepTwo(true);
        }
        if (resultGetExchange.data.MyBook.StatusID === 2) {
          setIsAcceptUserStepOne(true);
        }
        if (resultGetExchange.data.MyBook.StatusID === 3) {
          setIsAcceptUserStepTwo(true);
          setIsAcceptUserStepOne(true);
        }
        if (resultGetExchange.data.MyBook.StatusID === 4) {
          setIsAcceptUserStepThree(true);
          setIsAcceptUserStepTwo(true);
          setIsAcceptUserStepOne(true);
        }
        if ((resultGetExchange.data?.OtherBook?.StatusID === 2 || 3) && (resultGetExchange.data?.MyBook?.StatusID === 2 || 3)) {
          setStep(2);
        }
        if ((resultGetExchange.data?.OtherBook?.StatusID === 3) && (resultGetExchange.data?.MyBook?.StatusID === 3)) {
          setStep(3);
        }
        if ((resultGetExchange.data?.OtherBook?.StatusID === 4) && (resultGetExchange.data?.MyBook?.StatusID === 4)) {
          setStep(4);
        }
      } catch (error) {
        alert(`Не удалось ${error.message}`);
      }
      // finally {
      // if ((exchange?.OtherBook?.StatusID === (2 || 3)) && (exchange?.MyBook?.StatusID === (2 || 3))) {
      // setStep(2);
      // }
      // if ((exchange?.OtherBook?.StatusID === 3) && (exchange?.MyBook?.StatusID === 3)) {
      // setStep(3);
      // }
      // if ((exchange?.OtherBook?.StatusID === 4) && (exchange?.MyBook?.StatusID === 4)) {
      // setStep(4);
      // }
      // }
    })();
  }, []);
  // подтвердить
  const agreementHandler = async () => {
    try {
      await restPost(`/api/exchange/agree/${userId}/${masOfIdExchange[0]}`);
      setIsAcceptUserStepOne(true);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
      if ((resultGet.OtherBook.StatusID === 2) && (resultGet.MyBook.StatusID === 2)) {
        setStep(2);
      }
    } catch (error) {
      alert(`Не удалось ${error.message}`);
    }
  };
  // отпарвка трек номера
  const onSubmitForm = async () => {
    try {
      await restPost(`/api/exchange/send/${userId}/${masOfIdExchange[0]}`, formValues);
      setIsAcceptUserStepTwo(true);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
      if ((resultGet.OtherBook.StatusID === 3) && (resultGet.MyBook.StatusID === 3)) {
        setStep(3);
      }
    } catch (error) {
      alert(`Не удалось ${error.message}`);
    }
  };
  // кнопка получить
  const acceptDelivery = async () => {
    try {
      await restPost(`/api/exchange/receive/${userId}/${masOfIdExchange[0]}`);
      setIsAcceptUserStepThree(true);
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
      if ((resultGet.OtherBook.StatusID === 4) && (resultGet.MyBook.StatusID === 4)) {
        setStep(4);
      }
    } catch (error) {
      alert(`Не удалось ${error.message}`);
    }
  };

  // кнопка обновить
  const updateExchangeStatus = async () => {
    try {
      const resultGet = await restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`);
      setExchange(resultGet.data);
      if ((resultGet.data?.OtherBook?.StatusID === 2 || 3) && (resultGet.data?.MyBook?.StatusID === 2 || 3)) {
        setStep(2);
      }
      if ((resultGet.data?.OtherBook?.StatusID === 3) && (resultGet.data?.MyBook?.StatusID === 3)) {
        setStep(3);
      }
      if ((resultGet.data?.OtherBook?.StatusID === 4) && (resultGet.data?.MyBook?.StatusID === 4)) {
        setStep(4);
      }
      if (resultGet.data?.OtherBook?.StatusID === 2) {
        setIsAcceptContrUserStepOne(true);
      }
      if (resultGet.data?.OtherBook?.StatusID === 3) {
        setIsAcceptContrUserStepTwo(true);
        setIsAcceptContrUserStepOne(true);
      }
      if (resultGet.data?.OtherBook?.StatusID === 4) {
        setIsAcceptContrUserStepThree(true);
        setIsAcceptContrUserStepTwo(true);
        setIsAcceptContrUserStepOne(true);
      }
      if (resultGet.data?.MyBook?.StatusID === 2) {
        setIsAcceptUserStepOne(true);
      }
      if (resultGet.data?.MyBook?.StatusID === 3) {
        setIsAcceptUserStepTwo(true);
        setIsAcceptUserStepOne(true);
      }
      if (resultGet.data?.MyBook?.StatusID === 4) {
        setIsAcceptUserStepThree(true);
        setIsAcceptUserStepTwo(true);
        setIsAcceptUserStepOne(true);
      }
    } catch (error) {
      alert(`Не удалось ${error.message}`);
    }
    // finally {
    // if ((exchange?.OtherBook?.StatusID === (2 || 3)) && (exchange?.MyBook?.StatusID === (2 || 3))) {
    // setStep(2);
    // }
    // if ((exchange?.OtherBook?.StatusID === 3) && (exchange?.MyBook?.StatusID === 3)) {
    // setStep(3);
    // }
    // if ((exchange?.OtherBook?.StatusID === 4) && (exchange?.MyBook?.StatusID === 4)) {
    // setStep(4);
    // }
    // if (exchange?.OtherBook?.StatusID === 2) {
    // setIsAcceptContrUserStepOne(true);
    // }
    // if (exchange?.OtherBook?.StatusID === 3) {
    // setIsAcceptContrUserStepTwo(true);
    // setIsAcceptContrUserStepOne(true);
    // }
    // if (exchange?.OtherBook?.StatusID === 4) {
    // setIsAcceptContrUserStepThree(true);
    // setIsAcceptContrUserStepTwo(true);
    // setIsAcceptContrUserStepOne(true);
    // }
    // if (exchange?.MyBook?.StatusID === 2) {
    // setIsAcceptUserStepOne(true);
    // }
    // if (exchange?.MyBook?.StatusID === 3) {
    // setIsAcceptUserStepTwo(true);
    // setIsAcceptUserStepOne(true);
    // }
    // if (exchange?.MyBook?.StatusID === 4) {
    // setIsAcceptUserStepThree(true);
    // setIsAcceptUserStepTwo(true);
    // setIsAcceptUserStepOne(true);
    // }
    // }
  };
  console.log('сам обмен', exchange);
  console.log('шаг обмена ', step);
  console.log('dsadsa', isAcceptUserStepThree);
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
              <ul>
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
              <ul>
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
              {isAcceptUserStepOne && <p>Обмен подтвержден</p>}
              <br />
              {!isAcceptUserStepOne
              && step === 1 && (
              <Button
                variant="contained"
                // здесь отправка подтверждения обмена
                onClick={agreementHandler}
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
              {isAcceptUserStepTwo && !isAcceptUserStepThree && step === 2 && (
              <>
                <p>Номер отправления</p>
                <p>{exchange?.MyBook?.TrackNumber}</p>
              </>
              )}
              {isAcceptUserStepThree && step === 2 && (
              <>
                <p>Книга получена</p>
              </>
              )}

              {!isAcceptUserStepThree && step === 3 && (
              <>
                <p>Номер отправления</p>
                <p>{exchange?.MyBook?.TrackNumber}</p>
                <Button
                  className={style.btn}
                  variant="contained"
                  onClick={acceptDelivery}
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
        onClick={updateExchangeStatus}
      >
        Обновить статус обмена
      </Button>
    </div>
  );
};
export default ActiveOffers;
