/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';

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
    padding: '15px',
    height: '350px',
    margin: '15px',
    width: '450px',
  },
  containerOfForms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

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
  },
  containerOfInput: {
    display: 'flex',
    flexDirection: 'row',
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Delivery = ({ control }) => {
  const style = useStyle();
  return (
    <div className={style.container}>
      <div className={style.containerOfForms}>
        <h4>Адрес доставки</h4>
        <div className={style.containerOfInput}>
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
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
                control={control}
                label="Город*"
                name="AddrCity"
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
                      value: /[a-zа-я(-)]/g,
                      message: 'Только буквы и тире',
                    },
                  }
                }
                control={control}
                label="Улица*"
                name="AddrStreet"
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
                      // тут регулярка на букву и цифру
                      value: /[0-9(-)]/g,
                      message: 'Только буква и цифры',
                    },
                  }
                }
                  control={control}
                  label="Строение"
                  name="AddrStructure"
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
                      value: /[0-9(-)]/g,
                      // ругялрка на цифры и одну букву
                      message: 'Только цифры и буква',
                    },
                  }
                }
                  control={control}
                  label="Дом*"
                  name="AddrHouse"
                />
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
                      value: /[0-9]/g,
                      message: 'Только цифры',
                    },
                  }
                }
                  control={control}
                  label="Квартира"
                  name="AddrApart"
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
                      value: /[0-9]/g,
                      message: 'Только цифры',
                    },
                  }
                }
                control={control}
                label="Индекс*"
                name="AddrIndex"
              />
            </div>
          </Paper>
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
                      value: 50,
                      message: 'Не больше 25-ти символов',
                    },
                    pattern: {
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
                control={control}
                label="Фамилия*"
                name="LastName"
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
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
                control={control}
                label="Имя*"
                name="FirstName"
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
                      value: /[a-zа-я]/gi,
                      message: 'Только буквы',
                    },
                  }
                }
                control={control}
                label="Отчество"
                name="SecondName"
              />
            </div>
          </Paper>
        </div>
      </div>
    </div>

  );
};
export default Delivery;
