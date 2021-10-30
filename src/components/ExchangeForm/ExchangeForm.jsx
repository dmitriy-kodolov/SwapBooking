/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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
import { Link, useHistory } from 'react-router-dom';
import { setAlert } from 'store/slices/alertSlice';
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
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '60px',
  },
});

export default function ExchangeForm() {
  const dispatch = useDispatch();
  const style = useStyle();
  const history = useHistory();
  const userId = useSelector(((state) => state.login.userId));
  const propsFrom = useForm({
    defaultValues: {
      category_offer: [],
      category_wish: [],
      addr_index: '',
      addr_city: '',
      addr_street: '',
      addr_house: '',
      addr_structure: '',
      addr_appart: '',
      first_name_user: '',
      last_name_user: '',
      second_name_user: '',
    },
  });
  const {
    handleSubmit, control, setValue, setError,
    clearErrors,
  } = propsFrom;
  const formValues = propsFrom?.getValues();
  const [step, setStep] = useState(1);
  const [categorFromRecive, setCategorFromRecive] = useState([]);
  const [categorFromExchange, setCategorFromExchange] = useState([]);
  const categorFromApi = useSelector((state) => state?.category?.categories?.Categories);
  const initialProfile = useSelector((state) => state?.profileInfo?.userProfile?.[0]);
  const [initialCategory, setInitialCategory] = useState(null);
  const [profileInformation, setProfileInformation] = useState([]);
  const [isDefaultAddr, setIsDefaultAddr] = useState(false);
  const [isPostForm, setIsPostForm] = useState(false);
  const [yearOfDataPicker, setYearOfDataPicker] = useState(null);
  // запрос на получение данных с сервака
  useEffect(() => {
    dispatch(fetchProfileInfo(userId));
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setInitialCategory(categorFromApi);
  }, [categorFromApi]);
  useEffect(() => {
    setProfileInformation(initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    setValue('addr_index', profileInformation?.addr_index);
    setValue('addr_city', profileInformation?.addr_city);
    setValue('addr_street', profileInformation?.addr_street);
    setValue('addr_house', profileInformation?.addr_house);
    setValue('addr_structure', profileInformation?.addr_structure);
    setValue('addr_appart', profileInformation?.addr_appart);
    setValue('first_name_user', profileInformation?.first_name);
    setValue('last_name_user', profileInformation?.last_name);
    setValue('second_name_user', profileInformation?.second_name);
  }, [profileInformation]);

  useEffect(() => {
    setValue('category_offer', categorFromExchange);
  }, [categorFromExchange]);

  useEffect(() => {
    setValue('category_wish', categorFromRecive);
  }, [categorFromRecive]);

  useEffect(() => {
    setValue('is_default', isDefaultAddr);
  }, [isDefaultAddr]);

  useEffect(() => {
    setValue('year_publishing', yearOfDataPicker?.getFullYear()?.toString());
  }, [yearOfDataPicker]);

  const onSubmitForm = (value) => {
    setStep((prevState) => prevState + 1);
    if (step === 3) {
      restPost(`/api/order/${userId}`, value)
        .then(() => {
          setIsPostForm(true);
          history.push('/myExchanges');
        })
        .catch(async (error) => {
          await setStep((prevState) => prevState + 1);
          await dispatch(setAlert({ text: `Не удалось отправить форму', ${error.message}`, severity: 'error' }));
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
  if (step === 5 && !isPostForm) {
    return (
      <div className={style.error}>
        <p>Данные не отправились, попробуйте еще раз</p>
        <Link className={style.root} to="/main">На главную</Link>
      </div>
    );
  }
  return (

    <div className={style.root}>
      <h3>Бланк обмена</h3>
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
              yearOfDataPicker={yearOfDataPicker}
              setYearOfDataPicker={setYearOfDataPicker}
            />
            <div>
              <Category
                clearErrors={clearErrors}
                setError={setError}
                selectedCategories={formValues?.category_offer}
                setCategoriesForm={setCategorFromExchange}
                initialCategories={initialCategory}
                isError={true && !initialCategory}
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
            initialCategories={initialCategory}
            isError={true && !initialCategory}
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
          setIsDefaultAddr={setIsDefaultAddr}
          isDefaultAddr={isDefaultAddr}
          selectedDefault={formValues?.is_default}
        />
        <div className={style.delivery}>
          <Back />
          <Next />
        </div>
      </div>
      )}
      </form>
    </div>
  );
}
