/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect, useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { restDelete, restGet } from 'api/instances/main';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../store/slices/alertSlice';
import { fetchExchangeConfirm } from '../../store/slices/exchangesSlice';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

const WantsExchange = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId);
  const style = useStyle();
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const selectedBook = useSelector((state) => state.exchanges.selectedBook);

  const confirm = useCallback(async (id) => {
    try {
      await dispatch(fetchExchangeConfirm([id, selectedBook.OfferID])).unwrap();
    } catch (err) {
      dispatch(setAlert({ text: `Не удалось получить активный обмен ${err.message}`, severity: 'error' }));
    }
  }, [selectedBook]);
  // Получение хателок и установка состоятния
  useEffect(() => {
    restGet(`/api/myoffers/all/${userId}`)
      .then(({ data }) => {
        setIsLoading(false);
        setCard(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        dispatch(setAlert({ text: `Не удалось загрузить список', ${error.message}`, severity: 'error' }));
      });
  }, []);

  const removeCard = (id) => {
    setCard((prevState) => prevState.filter((el) => el.id_offer_list !== id));
  };

  const deleteCard = (wishId) => { // удаление карточки с базы данных
    restDelete(`/api/myoffers/${wishId}`)
      .then(() => {
        removeCard(wishId);
      })
      .catch((e) => dispatch(setAlert({
        text: 'Не удалось удалить карточку, попробуйте позже', severity: 'error',
      })));
  };

  if (isLoading) {
    return (
      <p>Загрузка</p>
    );
  }
  if (isError) {
    return (
      <p>Ошибка загрузки данных, попробуйте позже</p>
    );
  }
  if (!card?.length) {
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
            <Button onClick={() => deleteCard(item.id_offer_list)} size="small">Удалить</Button>
            {selectedBook ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => confirm(item.id_offer_list)}
                size="small"
              >
                Выбрать книгу
              </Button>
            ) : null }
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default WantsExchange;
