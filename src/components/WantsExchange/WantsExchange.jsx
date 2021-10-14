/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { restDelete } from 'api/instances/main';
import getAllExchanges from '../../api/getAllExchanges/getAllExchanges';

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
    id_wish_list: 14, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 15, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 16, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
  {
    id_wish_list: 17, // id строки  = уникальный номер хотелки
    id_user: 38,
    create_at: '2021-11-11T21:12:25.622002', // дата создания
    update_at: '2021-11-11T21:12:25.622002', // дата редактирования
    id_status: 4, // статус заявки
    id_user_address: 32,
  },
];
const WantsExchange = () => {
  const initialCard = getAllExchanges; // начальные карточки с хотелками
  const [card, setCard] = useState(mockList); // здесь надо менять на initialCard
  const removeCard = (id) => {
    setCard((prevState) => prevState.filter((el) => el.id_wish_list !== id));
  };
  //  здесь реализация удалении карточки как с сервака так и с состояния компоненты
  let isDeleteCard = false;
  const deleteCard = (wishId) => { // удаление карточки с базы данных
    restDelete(`/wishes/${wishId}`)
      .then(() => {
        isDeleteCard = true;
        return isDeleteCard;
      })
      .catch((e) => alert('Не удалось удалить карточку, попробуйте позже'));
  };
  const onSumbit = (wishId) => {
    deleteCard(wishId);
    if (isDeleteCard) {
      removeCard(wishId);
    }
  };
  const style = useStyle();
  return (
    <div className={style.container}>
      {card.map((item) => (
        <Card
          key={item.id_wish_list}
          sx={{
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
            <Button onClick={() => onSumbit(item.id_wish_list)} size="small">Убрать из желаемого</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default WantsExchange;
