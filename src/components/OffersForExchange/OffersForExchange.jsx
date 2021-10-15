/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    width: '800px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
const OffersForExchange = () => {
  const style = useStyle();
  return (
    <div className={style.root}>
      <p>Карточка обмена</p>
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
              Мне
            </Typography>
            <br />
            <br />
            <Typography align="center" variant="body2">
              Тут должна быть хотелка какая-то
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              Здесь  будет инофрмауция что обмен подтвержден, либо нет
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
              Я
            </Typography>
            <br />
            <br />
            <Typography align="center" variant="body2">
              Здесь то что пользователь будет менять
            </Typography>
            <br />
            <br />
            <br />
            <br />
            <Typography align="center" variant="body2">
              Здесь будет информация что обмен подтвержден, либо нет.
              Если нет, то будет кнопка подтвердить у пользователя
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant="contained" size="small">Подтвердить</Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};
export default OffersForExchange;
