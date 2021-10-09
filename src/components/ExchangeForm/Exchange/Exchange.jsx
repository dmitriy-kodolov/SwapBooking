/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Paper } from '@mui/material';
import Input from '../../Input/Input';

const useStyle = makeStyles(() => ({
  paper: {
    overflow: 'auto',
    padding: '15px',
    height: '300px',
    margin: '15px',
    width: '450px',
  },
  test: {
    margin: '5px',
    marginTop: '10px',
  },
  inputHome: {
    display: 'flex',
    flexDirection: 'row',
  },
  containerOfForms: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Exchange = ({
  control,
}) => {
  const style = useStyle();
  return (
    <div className={style.containerOfForms}>
      <Paper className={style.paper} elevation={4}>
        <div className={style.form}>
          <div className={style.inputHome}>
            <Input
              className={style.test}
              rules={
                  {
                    required: {
                      value: true,
                      message: 'Поле обязательно',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Не больше 20-ти символов',
                    },
                    pattern: {
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
              control={control}
              label="Имя автора*"
              name="FirstName"
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
                      value: 50,
                      message: 'Не больше 50-ти символов',
                    },
                    pattern: {
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
              control={control}
              label="Фамилия автора*"
              name="LastName"
            />
          </div>
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
                      message: 'Не больше 50-ти символов',
                    },
                    pattern: {
                      value: /[a-zа-я0-9("|'|-|.|,|\n?|!|;)]/gi,
                      message: 'Неправильное имя',
                    },
                  }
                }
            control={control}
            label="Название книги*"
            name="BookName"
          />
          <div className={style.inputHome}>
            <Input
              defaultValue=""
              className={style.test}
              rules={
                  {
                    maxLength: {
                      value: 13,
                      message: 'Не больше 13-ти символов',
                    },
                    pattern: {
                      value: /[0-9(-)]/g,
                      message: 'Только цифры и тире',
                    },
                  }
                }
              control={control}
              label="ISBN"
              name="ISBN"
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
                      value: 4,
                      message: 'Не больше 4-eх символов',
                    },
                    pattern: {
                      value: /[0-9]/g,
                      message: 'Только цифры',
                    },
                    validate: (value) => value <= new Date().getFullYear() || 'Не больше текущего года',
                  }
                }
              control={control}
              label="Год издания*"
              name="YearOfPublishing"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};
export default Exchange;
