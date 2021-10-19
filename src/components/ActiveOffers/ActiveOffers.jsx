/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from 'components/Input/Input';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { restPost } from 'api/instances/main';
import { setBook } from '../../store/slices/exchangesSlice';

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
  const [isPostForm, setIsPostForm] = useState(false);
  const [step, setStep] = useState(3);
  const [isAcceptUserStepOne, setIsAcceptUserStepOne] = useState(false);
  const [isAcceptUserStepTwo, setIsAcceptUserStepTwo] = useState(false);
  const [isAcceptUserStepThree, setIsAcceptUserStepThree] = useState(false);
  const [isAcceptContrUserStepOne, setIsAcceptContrUserStepOne] = useState(false);
  const [isAcceptContrUserStepTwo, setIsAcceptContrUserStepTwo] = useState(false);
  const [isAcceptContrUserStepThree, setIsAcceptContrUserStepThree] = useState(false);

  const propsFrom = useForm();
  const {
    handleSubmit, control, setValue, formState: { errors },
  } = propsFrom;
  const formValues = propsFrom?.getValues();

  const onSubmitForm = () => {
    console.log('Все данные с формы', formValues);
    restPost('тут норм звпрос', formValues)
      .then(() => {
        setIsPostForm(true);
        setStep((prev) => prev + 1);
      })
      .catch((err) => {
        // alert('Ошибка при отправки данных, попробуйте позже');
      });
  };

  const book = useSelector((state) => state.exchanges.selectedBook);

  const handleCancel = useCallback(() => {
    dispatch(setBook());
  });

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
                  <p>1234567891011</p>
                </>
              )}
              {!isAcceptContrUserStepTwo && step === 2 && (
                <p>Книга пока не отправлена</p>
              )}
              {isAcceptContrUserStepThree && step === 3 && (
                <p>Книга получена</p>
              )}
              {!isAcceptContrUserStepThree && step === 3 && (
                <p>Книга не получена</p>
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
              <Button variant="contained" size="small">Подтвердить</Button>
              )}
              {!isAcceptUserStepTwo && step === 2
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
                <p>1234567891011</p>
              </>
              )}
              {!isAcceptUserStepThree && step === 3 && (
              <>
                <p>Номер отправления</p>
                <p>1234567891011</p>
                <Button
                  className={style.btn}
                  variant="contained"
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
          {/* <CardActions style={{ justifyContent: 'center' }} /> */}
        </Card>
      </div>
    </div>
  );
};
export default ActiveOffers;
