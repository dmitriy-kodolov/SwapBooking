/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { restGet } from 'api/instances/main';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  listCategory: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  reciveUser: {
    position: 'relative',
    top: '130px',
  },
  reciveContrUser: {
    position: 'relative',
    top: '70px',
  },
});
const mockItem = {
  MyBook: {
    BookName: 'Название книги',
    Note: 'Инфа о книге',
    AuthorFirstName: 'Имя автора',
    AuthorLastName: 'Фамилия автора',
  },
  OtherBook: {
    BookName: 'Название книги',
    Note: 'Инфа о книге',
    AuthorFirstName: 'Имя автора',
    AuthorLastName: 'Фамилия автора',
  },
  OtherUser: {
    CityName: 'Название города',
    Rating: 5,
  },
};
const mockItemTwo = {
  MyBook: {
    BookName: 'Название sdsa',
    Note: 'Инфа о sds',
    AuthorFirstName: 'Имя sds',
    AuthorLastName: 'Фамилия sds',
  },
  OtherBook: {
    BookName: 'Название sdsa',
    Note: 'Инфа о sds',
    AuthorFirstName: 'Имя sds',
    AuthorLastName: 'Фамилия sds',
  },
  OtherUser: {
    CityName: 'Название dsds',
    Rating: 5,
  },
};
const testList = [];
testList.push(mockItem);
testList.push(mockItemTwo);
const Archive = () => {
  const style = useStyle();
  const [masOfId, setMasOfId] = useState([]);
  const [initialCard, setInitialCard] = useState(testList); // здесь надо менять на [] когда встанет бэк
  const userId = useSelector(((state) => state.login.userId));

  useEffect(() => {
    restGet(`/api/archive/${userId}/all`)
      .then((result) => {
        setMasOfId(result);
      })
      .catch((err) => alert(`Не удалось загрузить архив ${err.message}`));
  }, []);
  // если нету архива
  if (!masOfId?.length) {
    return (<p>У вас нет завершенных обменов</p>);
  }

  // запросы на получение архивных заявок
  useEffect(() => {
    masOfId.forEach((id) => {
      restGet(`/api/archive/${userId}/${id}`)
        .then((res) => {
          setInitialCard((prev) => prev.push(res));
        })
        .catch((err) => alert(`Не удалось загрузить заявку ${err.message}`));
    });
  }, [masOfId]);

  return (
    <div className={style.root}>
      {initialCard.map((card) => (
        <div className={style.container}>
          <Card
            elevation={4}
            sx={{
              width: 370,
              minHeight: 400,
              m: 2,
            }}
          >
            <CardContent>
              <Typography align="center" variant="h6">
                Я
              </Typography>
              <Typography align="center" variant="body3">
                <ul className={style.listCategory}>
                  {Object.values(card.MyBook).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Typography>
              <Typography className={style.reciveUser} align="center" variant="body3" component="div">
                Книга поулчена
              </Typography>
            </CardContent>
          </Card>
          <Card
            elevation={4}
            sx={{
              width: 370,
              minHeight: 400,
              m: 2,
            }}
          >
            <CardContent>
              <Typography align="center" variant="h6" component="div">
                Мне
              </Typography>
              <Typography align="center" variant="body3">
                <ul className={style.listCategory}>
                  {Object.values(card.OtherBook).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Typography>
              <Typography align="center" variant="body3">
                <ul className={style.listCategory}>
                  {Object.values(card.OtherUser).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Typography>
              <Typography className={style.reciveContrUser} align="center" variant="body3" component="div">
                Книга поулчена
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}

    </div>
  );
};
export default Archive;
