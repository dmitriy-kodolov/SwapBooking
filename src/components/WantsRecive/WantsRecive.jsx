/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});
const mockList = [
  {
    id_wish_list: 12, // id строки  = уникальный номер хотелки
    id_user: 37,
    create_at: '2021-10-11T21:12:25.622002', // дата создания
    update_at: '2021-10-11T21:12:25.622002', // дата редактирования
    id_status: 3, // статус заявки
    id_user_address: 31,
  },
  {
    id_wish_list: 13, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 13, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 13, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 13, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 13, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
];
const WantsRecive = () => {
  const style = useStyle();
  return (
    <div className={style.container}>
      {mockList.map((item) => (
        <Card sx={{
          minWidth: 400,
          m: 2,
        }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Номер заявки -
              {' '}
              {item.id_wish_list}
            </Typography>
            <Typography variant="body2">
              Дата создания -
              {' '}
              {new Date(item.create_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Дата редактирования -
              {' '}
              {new Date(item.update_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Статус заявки -
              {' '}
              {item.id_status}
            </Typography>
          </CardContent>
          <CardActions>
            {/* На кнопку подробнее надо повесить запрос получения данных
            более подробной информации хотелки */}
            <Button size="small">Подробнее</Button>
            <Button size="small">Убрать</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default WantsRecive;
