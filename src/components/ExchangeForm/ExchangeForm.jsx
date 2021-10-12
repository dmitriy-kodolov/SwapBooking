/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { restPost } from 'api/instances/main';
import { makeStyles } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProfileInfo } from 'store/slices/userProfileSlice';
// import { fetchCategories } from 'store/slices/categoriesSlice';
import { Link } from 'react-router-dom';
import Category from '../Category';
import Exchange from './Exchange';
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
  const isLogin = useSelector((state) => state.login);
  const userID = isLogin ? -1 : true;
  const propsFrom = useForm({
    defaultValues: {
      category_offer: [],
      category_wish: [],
      id_user: userID,
    },
  });
  const {
    handleSubmit, control, setValue, setError, formState: { errors },
    clearErrors,
  } = propsFrom;
  // TODO   запрос на получение данных с сервака
  // useEffect(() => {
    // dispatch(fetchProfileInfo());
    // dispatch(fetchCategories());
  // }, []);
  let isPostForm = false;
  const formValues = propsFrom?.getValues();
  const [step, setStep] = useState(1);
  const [categorFromRecive, setCategorFromRecive] = useState([]);
  const [categorFromExchange, setCategorFromExchange] = useState([]);
  useEffect(() => {
    setValue('category_offer', categorFromExchange);
  }, [categorFromExchange]);

  useEffect(() => {
    setValue('category_wish', categorFromRecive);
  }, [categorFromRecive]);

  const onSubmitForm = () => {
    setStep((prevState) => prevState + 1);
    console.log('Все значение полей в форме', formValues);
    if (step === 3) {
      // поменять урлу на рабочую и baseUrl
      const result = restPost('/post', formValues)
        .then(() => {
          isPostForm = true;
          return isPostForm;
        })
        .catch((err) => alert('Не валидные поля'));
    }
  };

  const Next = () => (
    <Button
      className={style.btn}
      variant="contained"
      type="submit"
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

  return (
    <form className={style.root} onSubmit={(event) => { handleSubmit(onSubmitForm)(event); }}>
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
            control={control}
          />
          <div>
            <Category
              clearErrors={clearErrors}
              setError={setError}
              selectedCategories={formValues?.category_offer}
              setCategoriesForm={setCategorFromExchange}
              initialCategories={mockCategor.Categories.Subcategories}
            />
          </div>
        </div>
        <div className={style.exchange}>
          <Next />
        </div>
      </div>
      )}
      {step === 2 && (
      <div className={style.root}>
        <Category
          clearErrors={clearErrors}
          setError={setError}
          selectedCategories={formValues?.category_wish}
          setCategoriesForm={setCategorFromRecive}
          initialCategories={mockCategor.Categories.Subcategories}
        />
        <div className={style.delivery}>
          <Back />
          <Next />
        </div>
      </div>
      )}
      {isLogin && step === 3
      && (
      <div>
        <Delivery control={control} />
        <div className={style.delivery}>
          <Back />
          <Next />
        </div>
      </div>
      )}
      {(step === 4 && isPostForm)
      && (
        <div>
          <p>Данные успешно отправлены</p>
          <Link className={style.root} to="/main">На главную</Link>
        </div>
      )}
      {(step === 4 && !isPostForm)
      && (
        <div>
          <p>Данные не отправились, попробуйте еще раз</p>
          <Link className={style.root} to="/main">На главную</Link>
        </div>
      )}
    </form>
  );
}
