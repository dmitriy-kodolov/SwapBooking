/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { Checkbox, Paper } from '@mui/material';
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
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '400px',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const Delivery = ({
  control, setIsDefaultAddr, isDefaultAddr, selectedDefault,
}) => {
  // const [isDefault, setIsDefault] = useState(false);

  const togle = () => {
    setIsDefaultAddr((prev) => !prev);
  };
  const style = useStyle();
  return (
    <div className={style.container}>
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
          <p>
            <Checkbox
              checked={isDefaultAddr}
              onChange={togle}
            />
            Использовать этот адресс по умолчанию
          </p>
        </div>
      </Paper>
    </div>
  );
};
export default Delivery;
