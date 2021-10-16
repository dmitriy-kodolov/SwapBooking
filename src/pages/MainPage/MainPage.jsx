import { makeStyles } from '@material-ui/styles';
import { Paper } from '@mui/material';
import React from 'react';

const useStyle = makeStyles({
  root: {
    width: '500px',
    margin: '30px',
    padding: '15px',
    display: 'flex',
    height: '600px',
  },
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'justify',
  },
});
const MainPage = () => {
  const style = useStyle();
  return (

    <div className={style.container}>
      <Paper className={style.root} elevation={4}>
        <p className={style.text}>
          Обмен книгами (буккроссер) становится всё более популярен.
          Это даёт шанс бумажным книгам продлить свою жизнь, помогает владельцам книг делиться
          хорошими историямии получать новые впечатления.
          Все буккроссеры любят свои книги и любят их читать.
          Они щедрые, новаторские, дружелюбные, добросердечные, веселые и образованные люди.
          Наш сайт предлагает совершить не просто обмен,
          а добавить к этому увлекательному процессу элемент сюрприза.
          Подбор книг для обмена будет выполнен по пожеланиям участников,
          но только при получении книги станет известно,
          какая именно книга будет радовать своего владельца.
          Интересно? Тогда начинайте обмен и приглашайте своих друзей поучаствовать!
        </p>
      </Paper>
    </div>
  );
};
export default MainPage;
