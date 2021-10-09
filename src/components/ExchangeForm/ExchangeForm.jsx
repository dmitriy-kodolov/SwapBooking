/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Category from '../Category';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import Exchange from './Exchange';
import Receive from './Receive';
import Delivery from './Delivery/Delivery';

const useStyle = makeStyles({
  containerOfExchange: {
    display: 'flex',
    flexDirection: 'row',
  },
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
const mockCategor = {
  Categories: {
    ID: 1,
    Name: 'Все книги',
    Multiselect: true,
    Subcategories: [
      {
        ID: 2,
        Name: 'Детектив',
        Multiselect: true,
        Subcategories: [
          {
            ID: 5,
            Name: 'Русский детектив',
            Multiselect: true,
          },
          {
            ID: 6,
            Name: 'Зарубежный детектив',
            Multiselect: true,
          },
        ],
      },
      {
        ID: 3,
        Name: 'Фантастика',
        Multiselect: true,
      },
      {
        ID: 4,
        Name: 'Фэнтези',
        Multiselect: true,
      },
    ],
  },
};

export default function ExchangeForm() {
  const dispatch = useDispatch();
  const style = useStyle();
  const propsFrom = useForm({
    defaultValues: {
      categoriesExchange: [],
      categoriesRecive: [],
    },
  });
  const {
    handleSubmit, control, setValue, setError, formState: { errors },
    clearErrors,
  } = propsFrom;

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const formValues = propsFrom?.getValues();

  const [step, setStep] = useState(1);
  const [categorFromRecive, setCategorFromRecive] = useState([]);
  const [categorFromExchange, setCategorFromExchange] = useState(mockCategor);
  useEffect(() => {
    clearErrors('categoriesExchange');
    setValue('categoriesExchange', categorFromExchange);

    if (categorFromExchange?.length < 1) {
      setError('categoriesExchange', { type: 'required', message: 'Обязательно выберите' });
    }
  }, [categorFromExchange]);

  useEffect(() => {
    setValue('categoriesRecive', categorFromRecive);
  }, [categorFromRecive]);

  const onSubmitForm = (data) => {
    setStep((prevState) => prevState + 1);
    if (step === 3) {
      const newData = { ...data, exchangeCategor: categorFromExchange, receiveCategor: categorFromRecive };
      console.log(newData);
    }
  };

  const Next = () => (
    <Button
      className={style.btn}
      variant="contained"
      onClick={() => {
        setStep((prev) => prev + 1);
      }}
    >
      { step === 3 ? 'Подтвердить данные' : 'Далее' }
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

  // console.log('form values', propsFrom?.getValues());
  // console.log('form erros', errors);
  //  это вешаем на форму onSubmit={(event) => { handleSubmit(onSubmitForm)(event); }}
  return (
    <form className={style.root}>
      <Box sx={{ width: '100%' }}>
        <Tabs
          centered
          value={step - 1}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Хочу обменять" />
          <Tab label="Хочу получить" />
          <Tab label="Адрес доставки" />
        </Tabs>
      </Box>
      {step === 1 && (
      <div>
        <div className={style.containerOfExchange}>
          <Exchange
            setCategorFromExchange={setCategorFromExchange}
            categorFromExchange={categorFromExchange}
            formValues={formValues?.categoriesExchange || []}
            control={control}
          />
          <Category
            setCategories={setCategorFromExchange}
            initialCategories={categorFromExchange}
          />
        </div>
        <div className={style.exchange}>
          <Next />
        </div>
      </div>
      )}
      {step === 2 && (
      <div className={style.root}>
        {/* <Receive categorFromRecive={categorFromRecive} setCategorFromRecive={setCategorFromRecive} control={control} /> */}
        <Category
          setCategories={setCategorFromExchange}
          initialCategories={categorFromExchange}
        />
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
          <Next />
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
