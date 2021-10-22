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
    if (!masOfIdExchange.length) {
      restGet(`/api/exchange/${userId}/all`)
        .then(({ data }) => {
          setMasOfIdExchange(data);
          restGet(`/api/exchange/${userId}/${data[0]}`)
            .then(({ data }) => {
              setExchange(data);
            })
            .catch((err) => alert(`не удалось получить данные об обмене ${err.message}`));
        })
        .catch((err) => alert(`Не удалось загрузить список, ${err.message}`));
    }
  }, []);

  // отпарвка трек номера
  const onSubmitForm = () => {
    console.log(formValues);
    restPost(`/api/exchange/send/${userId}/${masOfIdExchange[0]}`, formValues)
      .then(() => {
        setIsAcceptUserStepTwo(true);
        restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`)
          .then(({ data }) => setExchange(data))
          .catch((err) => alert(`Не удалось получить статус обмена ${err.message}`));
        if (isAcceptContrUserStepTwo) {
          setStep((prev) => prev + 1);
        }
      })
      .catch((err) => {
        alert(`Ошибка при отправки данных, попробуйте позже ${err.message}`);
      });
  };
  // if (!masOfIdExchange?.length) {
    // return (<p>У вас нет активного обмена</p>);
  // }
  const isTrue = (StatusID) => {
    switch (StatusID) {
      case 2:
        setIsAcceptContrUserStepOne(true);
        setIsAcceptUserStepOne(true);
        break;
      case 3:
        setIsAcceptUserStepTwo(true);
        setIsAcceptContrUserStepTwo(true);
        break;
      case 4:
        setIsAcceptUserStepThree(true);
        setIsAcceptContrUserStepThree(true);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    isTrue(exchange?.OtherBook?.StatusID);
  }, [exchange]);
  const isStep = (isAcceptMe, isAcceptOther) => {
    switch (isAcceptMe && isAcceptOther) {
      case true:
        setStep(1);
        break;
      case true:
        setStep(2);
        break;
      case true:
        setStep(3);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    isStep(isAcceptUserStepOne, isAcceptContrUserStepOne);
  }, []);
  console.log('test', exchange);
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
              Тут должна быть хотелка какая-то
              {exchange?.OtherBook?.AuthorFirstName}
              {exchange?.OtherBook?.AuthorLastName}
              {exchange?.OtherBook?.BookName}
              {exchange?.OtherBook?.Note}
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
                    .then(() => {
                      setIsAcceptUserStepOne(true);
                      restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`)
                        .then(({ data }) => setExchange(data))
                        .catch((err) => alert(`Не удалось получить активный обмен ${err.message}`));
                      // TODO  здесь надо вставлять функцию которая будет менять шаг взависимости от isAccept
                      // if (isAcceptContrUserStepOne) {
                      // setStep((prev) => prev + 1);
                      // }
                    })
                    .catch((err) => alert('Не удалось подтвердить обмен'));
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
                        // TODO  здесь надо вставлять функцию которая будет менять шаг взависимости от isAccept
                        // if (isAcceptContrUserStepOne) {
                        // setStep((prev) => prev + 1);
                        // }
                      })
                      .catch((err) => alert(`Не удалось подтвердить получение, попробуйте позже ${err.message}`));
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
        onClick={() => {
          restGet(`/api/exchange/${userId}/${masOfIdExchange[0]}`)
            .then(({ data }) => setExchange(data))
            .catch((err) => alert(`Не удалось получить активный обмен ${err.message}`));
        }}
      >
        Обновить статус обмена
      </Button>
    </div>
  );
};
export default ActiveOffers;
