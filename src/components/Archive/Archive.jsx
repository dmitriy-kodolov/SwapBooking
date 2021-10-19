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
const Archive = () => {
  const style = useStyle();
  const [initialCard, setInitialCard] = useState(mockItem);
  const userId = useSelector(((state) => state.login.userId));
  //   useEffect(() => {
  // restGet(`/api/archive/${userId}/all`);
  //   }, []);
  return (
    <div className={style.root}>
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
            <Typography align="center" variant="h6" component="div">
              Я
            </Typography>
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listCategory}>
                {Object.values(initialCard.MyBook).map((item) => <li>{item}</li>)}
              </ul>
            </Typography>
            <br />
            <br />
            <br />
            <br />
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
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listCategory}>
                {Object.values(initialCard.OtherBook).map((item) => <li>{item}</li>)}
              </ul>
            </Typography>
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              <ul className={style.listCategory}>
                {Object.values(initialCard.OtherUser).map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Archive;
