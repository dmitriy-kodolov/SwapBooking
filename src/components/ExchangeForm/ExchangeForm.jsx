/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
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
import { fetchProfileInfo } from 'store/slices/userProfileSlice';
import { fetchCategories } from 'store/slices/categoriesSlice';
import { Link } from 'react-router-dom';
import getCategoriesOfBook from 'api/categoriesOfBook/getCategoriesOfBook';
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
  const userId = useSelector(((state) => state.login.userId));
  const propsFrom = useForm({
    defaultValues: {
      category_offer: [],
      category_wish: [],
      addr_index: 1,
      addr_city: 'Тест',
      addr_street: 'Тест',
      addr_house: '1',
      addr_structure: '2а',
      addr_appart: '2',
      FirstName: 'Тест',
      LastName: 'Тест',
      SecondName: 'Тесты',
    },
  });
  const {
    handleSubmit, control, setValue, setError, formState: { errors },
    clearErrors,
  } = propsFrom;
  useEffect(() => {
    (async () => {
      console.log('Запрос');
      await getCategoriesOfBook();
    });
  }, []);

  // запрос на получение данных с сервака
  useEffect(() => {
    dispatch(fetchProfileInfo(userId));
    dispatch(fetchCategories());
  }, []);
  // const firstName = useSelector((state) => (state.profile.UserName));
  // const lastName = useSelector((state) => (state.profile.LastName));
  // const secondName = useSelector((state) => (state.profile.SecondName));
  // const addrCity = useSelector((state) => (state.profile.AddrCity));
  // const addrIndex = useSelector((state) => (state.profile.AddrIndex));
  // const addrStreet = useSelector((state) => (state.profile.AddrStreet));
  // const addrHouse = useSelector((state) => (state.profile.AddrHouse));
  // const addrStructure = useSelector((state) => (state.profile.AddrStructure));
  // const addrAppart = useSelector((state) => (state.profile.AddrAppart));
  // useEffect(() => {
  // setValue('addr_index', addrIndex);
  // setValue('addr_city', addrCity);
  // setValue('addr_street', addrStreet);
  // setValue('addr_house', addrHouse);
  // setValue('addr_structure', addrStructure);
  // setValue('addr_appart', addrAppart);
  // setValue('FirstName', firstName);
  // setValue('LastName', lastName);
  // setValue('SecondName', secondName);
  // });

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
  // отправка формы
  const [isPostForm, setIsPostForm] = useState(false);
  const onSubmitForm = () => {
    setStep((prevState) => prevState + 1);
    if (step === 3) {
      const result = restPost(`/api/order/${userId}`, formValues)
        .then(() => {
          setIsPostForm(true);
        })
        .catch((err) => {
          console.error(err);
          alert('Не валидные поля');
        });
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
      {step === 3
      && (
      <div>
        <Delivery
          control={control}
          addr_index={formValues.addr_index}
          addr_city={formValues.addr_index}
          addr_street={formValues.addr_index}
          addr_house={formValues.addr_index}
          addr_structure={formValues.addr_index}
          addr_appart={formValues.addr_index}
          FirstName={formValues.FirstName}
          LastName={formValues.LastName}
          SecondName={formValues.SecondName}
        />
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
