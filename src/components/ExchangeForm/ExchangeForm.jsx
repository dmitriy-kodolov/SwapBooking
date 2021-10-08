/* eslint-disable max-len */
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
  const [categorFromRecive, setCategorFromRecive] = useState([]);
  const [categorFromExchange, setCategorFromExchange] = useState([]);
  const onSubmitForm = (data) => {
    setStep((prevState) => prevState + 1);
    console.log(data);
    if (step === 3) {
      const newData = { ...data, exchangeCategor: categorFromExchange, receiveCategor: categorFromRecive };
      console.log(newData);
    }
    // console.log('step3', data);
    // if (!data.genere.length) {
    // console.log('net');
    // }
  };

  const Next = () => (
    <Button
      className={style.btn}
      variant="contained"
      type="submit"
    >
      Далее
    </Button>
  );
  const Accept = () => (
    <Button
      type="submit"
      size="medium"
      className={style.btn}
      variant="contained"
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
    <form className={style.root} onSubmit={(event) => { handleSubmit(onSubmitForm)(event); }}>
      {step === 1 && (
      <div>
        <Exchange setCategorFromExchange={setCategorFromExchange} categorFromExchange={categorFromExchange} control={control} />
        <div className={style.exchange}>
          <Next />
        </div>
      </div>
      )}
      {step === 2 && (
      <div className={style.root}>
        <h4>Хочу получить</h4>
        <Receive categorFromRecive={categorFromRecive} setCategorFromRecive={setCategorFromRecive} control={control} />
        <div className={style.delivery}>
          <Back />
          <Next />
        </div>
      </div>
      )}
      {step === 3
      && (
      <div>
        <Delivery control={control} />
        <div className={style.delivery}>
          <Back />
          <Accept />
        </div>
      </div>
      )}
      {step === 4
      && (
      <p>Данные успешно отправлены</p>
      )}
    </form>
  );
}
