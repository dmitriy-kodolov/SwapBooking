/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { restDelete, restGet } from 'api/instances/main';
import { useSelector } from 'react-redux';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});
const mockList = [
  {
    id_offer_list: 21,
    create_at: '2021-10-14T20:34:28.326104',
    update_at: '2021-10-14T20:34:28.326104',
    id_status: '',
    book_name: 'Название книги',
    note: 'no note',
    last_name: 'Фамилия Автора',
    first_name: 'Имя Атора',
    isbn: 'ISBN книги',
    year_publishing: '2000-01-01',
  },
  {
    id_status: '',
    create_at: '2021-10-14T20:34:28.326104',
    update_at: '2021-10-14T20:34:28.326104',
    id_offer_list: 22,
    book_name: 'Название книги',
    note: 'no note',
    last_name: 'Фамилия Автора',
    first_name: 'Имя Атора',
    isbn: '',
    year_publishing: '2000-01-01',
  },
];
const WantsExchange = () => {
  const userId = useSelector((state) => state.login.userId);
  const style = useStyle();
  const [card, setCard] = useState(mockList);
  const [isDeleteCard, setIsDeleteCard] = useState(false);

  // Получение хателок и установка состоятния
  useEffect(() => {
    restGet(`/api/myoffers/all/${userId}`)
      .then(({ data }) => setCard(data))
      .catch((error) => alert(`Не удалось загрузить список', ${error.message}`));
  }, []);

  const removeCard = (id) => {
    setCard((prevState) => prevState.filter((el) => el.id_offer_list !== id));
  };

  const deleteCard = (wishId) => { // удаление карточки с базы данных
    restDelete(`/api/myoffers/${wishId}`) // здесь надо точно узнавать как будет выглядить путь у бэка
      .then(() => {
        setIsDeleteCard(true);
      })
      .catch((e) => alert('Не удалось удалить карточку, попробуйте позже'));
  };

  const onSumbit = (wishId) => {
    deleteCard(wishId);
    if (isDeleteCard) {
      removeCard(wishId);
    }
  };
  if (!card.length) {
    return (
      <p>У вас нету списка того, что вы хотите отдать</p>
    );
  }
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
              {item.id_offer_list}
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
            <Typography variant="body2">
              Название книги -
              {' '}
              {item.book_name}
            </Typography>
            <Typography variant="body2">
              Автор -
              {' '}
              {`${item.last_name} ${item.first_name}`}
            </Typography>
            <Typography variant="body2">
              ISBN -
              {' '}
              {item.isbn || 'отсутствует'}
            </Typography>
            <Typography variant="body2">
              Год публикации -
              {' '}
              {item.year_publishing}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => onSumbit(item.id_offer_list)} size="small">Убрать из желаемого</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default WantsExchange;
