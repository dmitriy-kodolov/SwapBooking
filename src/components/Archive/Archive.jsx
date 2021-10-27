/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { restGet } from 'api/instances/main';
import { setAlert } from 'store/slices/alertSlice';
import getArchive from 'api/getArchiveById/getArchive';

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
    top: '59px',
  },
});

const Archive = () => {
  const dispatch = useDispatch();
  const style = useStyle();
  const [masOfId, setMasOfId] = useState([]);
  const [initialCard, setInitialCard] = useState([]);
  const userId = useSelector(((state) => state.login.userId));

  useEffect(() => {
    (async () => {
      try {
        const resultGet = await restGet(`/api/archive/${userId}/all`);
        setMasOfId(resultGet.data);
        if (resultGet?.data?.length) {
          const getForIdOffers = resultGet.data?.map((id) => getArchive(userId, id));
          const fetchResultCards = await Promise.allSettled(getForIdOffers);
          const resultCard = fetchResultCards
            .filter((cardRes) => cardRes.status === 'fulfilled')
            .filter((cardValue) => cardValue.value.status === 200)
            .map((cardRes) => cardRes.value.data);
          setInitialCard(resultCard);
        }
      } catch (err) {
        dispatch(setAlert({ text: `Не удалось получить архив ${err.message}`, severity: 'error' }));
      }
    })();
  }, []);
  if (!masOfId?.length) {
    return (<p>У вас нет завершенных обменов</p>);
  }
  return (
    <div className={style.root}>
      {initialCard?.map((card) => (
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
                  <li>
                    {card?.MyBook?.AuthorFirstName }
                    {' '}
                    {card?.MyBook?.AuthorLastName}
                  </li>
                  <li>
                    {card?.MyBook?.BookName}
                  </li>

                  {card?.DateTime
                  && (
                  <li>
                    {new Date(card?.DateTime).toLocaleString()}
                  </li>
                  )}

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
                  <li>
                    {card?.OtherBook?.AuthorFirstName }
                    {' '}
                    {card?.OtherBook?.AuthorLastName}
                  </li>
                  <li>
                    {card?.OtherBook?.BookName}
                  </li>
                  {card?.DateTime
                  && (
                  <li>
                    {new Date(card?.DateTime).toLocaleString()}
                  </li>
                  )}
                  <br />
                  <li>
                    Город:
                    {' '}
                    {card?.OtherUser?.CityName}
                  </li>
                  <li>
                    Рэйтинг:
                    {' '}
                    {card?.OtherUser?.Rating}
                  </li>
                </ul>
              </Typography>
              <Typography align="center" variant="body3" />
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
