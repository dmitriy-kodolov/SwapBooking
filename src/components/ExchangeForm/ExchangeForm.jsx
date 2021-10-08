/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import Exchange from './Exchange';
import Receive from './Receive';
import Delivery from './Delivery/Delivery';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btn: {
    margin: '5px',
  },
  exchange: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  delivery: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function ExchangeForm() {
  const style = useStyle();
  const { handleSubmit, control } = useForm();
  const [step, setStep] = useState(1);
  const onSubmit = (data) => {
    console.log(data);
  };
  const Next = () => (
    <Button
      className={style.btn}
      variant="contained"
      onClick={handleSubmit(onSubmit)}
      // TODO Проблема здесь в том что валидация происходит по кнопке далее, через функцию
      // handlesubmit Но на этой же кнопке должна висеть функция переключения шагов, и если
      // ее прокидывать через колбэк то она не работает
      // onClick={() => {
        // handleSubmit(onSubmit);
        // if (step !== 3) {
          // setStep((prevState) => prevState + 1);
        // }
      // }}
    >
      Далее
    </Button>
  );
  const Accept = () => (
    <Button
      size="medium"
      className={style.btn}
      variant="contained"
      onClick={handleSubmit(onSubmit)}
    >
      Подтвердить данные
    </Button>
  );

  const Back = () => (
    <Button
      className={style.btn}
      variant="contained"
      onClick={() => {
        if (step !== 1) {
          setStep((prevState) => prevState - 1);
        }
      }}
    >
      Назад
    </Button>
  );
  return (
    <form className={style.root} onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
      <div>
        <Exchange control={control} />
        <div className={style.exchange}>
          <Next />
        </div>
      </div>
      )}
      {step === 2 && (
      <div className={style.root}>
        <h4>Хочу получить</h4>
        <Receive control={control} />
        <div className={style.delivery}>
          <Back />
          <Next />
        </div>
      </div>
      )}
      {step === 3
      && (
      <div>
        <Delivery />
        <div className={style.delivery}>
          <Back />
          <Accept />
        </div>
      </div>
      )}
    </form>
  );
}
