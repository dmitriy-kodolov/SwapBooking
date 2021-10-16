/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button } from '@mui/material';
import Input from 'components/Input/Input';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

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
}));
const Profile = () => {
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
  // const userId = useSelector(((state) => state.login.userId));
  const {
    handleSubmit, control, setValue, formState: { errors },
  } = propsFrom;
  // const formValues = propsFrom?.getValues();
  const style = useStyle();
  return (
    <form className={style.container}>
      <Paper className={style.paper} elevation={4}>
        <div className={style.root}>
          <Input
            className={style.test}
            rules={
                  {
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
  );
};
export default Profile;
