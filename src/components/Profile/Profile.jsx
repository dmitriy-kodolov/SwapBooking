/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button } from '@mui/material';
import Input from 'components/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { restPost } from 'api/instances/main';
import { fetchProfileInfo } from 'store/slices/userProfileSlice';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(() => ({
  test: {
    margin: '5px',
    marginTop: '10px',
  },
  inputHome: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    padding: '15px 15px 45px 15px',
    height: 'auto',
    margin: '15px',
    width: '450px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '400px',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '35px',
  },
  btn: {
    width: '480px',
    padding: '15px',
  },
  linkToMain: {
    textDecoration: 'none',
  },
}));
const Profile = () => {
  const dispatch = useDispatch();
  const propsFrom = useForm({
    defaultValues: {
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
  const [profileInformation, setProfileInformation] = useState([]);
  const initialProfile = useSelector((state) => state?.profileInfo?.userProfile?.[0]);
  const [isPostForm, setIsPostForm] = useState(false);
  const formValues = propsFrom?.getValues();
  const userId = useSelector(((state) => state.login.userId));
  const {
    handleSubmit, control, setValue, formState: { errors },
  } = propsFrom;
  const style = useStyle();
  const onSubmitForm = () => {
    console.log('Все данные с формы', formValues);
    const result = restPost(`/api/profile/${userId}`, formValues)
      .then(() => {
        setIsPostForm(true);
      })
      .catch((err) => {
        alert('Ошибка при отправки данных, попробуйте позже');
      });
  };
  useEffect(() => {
    dispatch(fetchProfileInfo(userId));
  }, []);
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

  return (
    <div>
      {!isPostForm
      && (
      <form
        className={style.container}
        onSubmit={(event) => { handleSubmit(onSubmitForm)(event); }}
      >
        <Paper className={style.paper} elevation={4}>
          <div className={style.root}>
            <Input
              className={style.test}
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Не больше 15-ти символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я]+$/,
                      message: 'Только кириллица',
                    },
                  }
                }
              control={control}
              label="Город*"
              name="addr_city"
            />
            <Input
              className={style.test}
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 25,
                      message: 'Не больше 25-ти символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я0-9-]{0,25}$/,
                      message: 'Только кириллица, цифры, тире',
                    },
                  }
                }
              control={control}
              label="Улица*"
              name="addr_street"
            />
            <div className={style.inputHome}>
              <Input
                defaultValue=""
                className={style.test}
                rules={
                  {
                    maxLength: {
                      value: 3,
                      message: 'Не больше 3-ех символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я]?[0-9]{0,2}$/,
                      message: 'Только буква и цифры',
                    },
                  }
                }
                control={control}
                label="Строение"
                name="addr_structure"
              />
              <Input
                className={style.test}
                rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 5,
                      message: 'Не больше 5-ти символов',
                    },
                    pattern: {
                      value: /^[0-9]+[а-яА-Я]?$/,
                      message: 'Только цифры и буква',
                    },
                  }
                }
                control={control}
                label="Дом*"
                name="addr_house"
              />
              <Input
                className={style.test}
                rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 3,
                      message: 'Не больше 3-ех символов',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Только цифры',
                    },
                  }
                }
                control={control}
                label="Квартира"
                name="addr_appart"
              />
            </div>
            <Input
              className={style.test}
              defaultValue=""
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 6,
                      message: 'Не больше 6-ти символов',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Только цифры',
                    },
                  }
                }
              control={control}
              label="Индекс*"
              name="addr_index"
            />
          </div>
          <div className={style.root}>
            <Input
              className={style.test}
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Не больше 25-ти символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я]+$/,
                      message: 'Только кириллица',
                    },
                  }
                }
              control={control}
              label="Фамилия*"
              name="last_name_user"
            />
            <Input
              className={style.test}
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 25,
                      message: 'Не больше 25-ти символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я]+$/,
                      message: 'Только кириллица',
                    },
                  }
                }
              control={control}
              label="Имя*"
              name="first_name_user"
            />
            <Input
              className={style.test}
              defaultValue=""
              rules={
                  {
                    maxLength: {
                      value: 25,
                      message: 'Не больше 25-ти символов',
                    },
                    pattern: {
                      value: /^[а-яА-Я]+$/,
                      message: 'Только кириллица',
                    },
                  }
                }
              control={control}
              label="Отчество"
              name="second_name_user"
            />
          </div>
        </Paper>
        <Button
          className={style.btn}
          variant="outlined"
          type="submit"
        >
          Подтвердить изменения
        </Button>
      </form>
      )}
      {isPostForm
      && (
      <div>
        <h3>Данные успешно измененны </h3>
        <Link className={style.linkToMain} to="/main">На главную</Link>
      </div>
      )}
    </div>

  );
};
export default Profile;