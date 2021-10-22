/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { restDelete } from 'api/instances/main';
import { restGet } from '../../api/instances/main';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  listCategory: {
    paddingLeft: '25px',
  },
});

const WantsRecive = () => {
  const userId = useSelector((state) => state.login.userId);
  const style = useStyle();
  const [initialWishes, setInitialWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    restGet(`/api/wishes/all/${userId}`)
      .then(({ data }) => {
        setIsLoading(false);
        setInitialWishes(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        alert(`Не удалось загрузить список', ${error.message}`);
      });
  }, []);

  const removeCard = (id) => {
    setInitialWishes((prevState) => prevState.filter((el) => el.wish_data.id_wish_list !== id));
  };

  const deleteCard = (wishId) => { // удаление карточки с базы данных
    restDelete(`/api/wish/${wishId}`)
      .then(() => {
        removeCard(wishId);
      })
      .catch((error) => alert(`Не удалось удалить карточку, попробуйте позже, ${error.message}`));
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
  if (!initialWishes.length) {
    return (
      <p>У вас нету списка того, что вы хотите получить</p>
    );
  }
  return (
    <div className={style.container}>
      {initialWishes.map((item) => (
        <Card sx={{
          minWidth: 400,
          m: 2,
        }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Номер заявки -
              {' '}
              {item.wish_data.id_wish_list}
            </Typography>
            <Typography variant="body2">
              Дата создания -
              {' '}
              {new Date(item.wish_data.create_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Дата редактирования -
              {' '}
              {new Date(item.wish_data.update_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Статус заявки -
              {' '}
              {item.wish_data.id_status}
            </Typography>
            <Typography variant="body2">
              {item.categories?.length
              && (
              <>
                <p>Категории:</p>
                <ul className={style.listCategory}>
                  {item.categories.map((category) => <li>{category}</li>)}
                </ul>
              </>
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => deleteCard(item.wish_data.id_wish_list)} size="small">Убрать из желаемого</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
export default WantsRecive;
