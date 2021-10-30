import React, { useCallback, useEffect } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import CoincidencesItem from '../CoincidencesItem/CoincidencesItem';
import { fetchOffers } from '../../../../store/slices/exchangesSlice';
import { setAlert } from '../../../../store/slices/alertSlice';

export default function CoincidencesList() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.login.userId);
  const offers = useSelector((state) => state.exchanges?.offers || {});
  const isLoading = useSelector((state) => state.exchanges?.offerIsLoading);
  const error = useSelector((state) => state.exchanges?.offerError);

  useEffect(() => {
    if (error) {
      dispatch(setAlert({ text: error, severity: 'error' }));
    }
  }, [error]);

  const getData = useCallback(() => {
    dispatch(fetchOffers(userId));
  }, [userId]);

  useEffect(() => {
    getData();
  }, [userId]);

  const Header = styled(Typography)(({ theme }) => ({
    ...theme.typography.h5,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
  }));

  return (
    <Grid container spacing={2} sx={{ position: 'relative' }}>
      <LoadingButton
        sx={{ m: 3 }}
        variant="contained"
        color="info"
        onClick={getData}
        isLoading={isLoading}
      >
        Обновить предложения
      </LoadingButton>
      {
        error
          ? (
            <Grid item xs={12} sx={{ m: 2 }}>
              <Typography>Ошибка загрузки данных, попробуйте позже</Typography>
            </Grid>
          )
          : null
      }
      {
        !error
          ? (
            <>
              { offers?.full?.length ? (
                <>
                  <Grid item xs={12} sx={{ height: 50 }}>
                    <Header>Полное совпадение</Header>
                  </Grid>
                  <Grid
                    container
                    xs={8}
                    sx={{
                      m: 2,
                      maxHeight: 300,
                      overflow: 'scroll',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderRadius: 4,
                    }}
                    spacing={2}
                  >
                    {
                      offers?.full?.map((book) => (
                        <CoincidencesItem
                          name={book.BookName}
                          city={book.OfferUser.CityName}
                          rating={book.OfferUser.Rating}
                          key={book.OfferID}
                          book={book}
                          author={book.Author}
                        />
                      )) || null
                    }
                  </Grid>
                </>
              ) : null}
              { offers?.partial?.length ? (
                <>
                  <Grid item xs={12} sx={{ height: 50 }}>
                    <Header>Частичное совпадение</Header>
                  </Grid>
                  <Grid
                    container
                    xs={8}
                    sx={{
                      m: 2,
                      maxHeight: 300,
                      overflowY: 'scroll',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderRadius: 4,
                    }}
                    spacing={2}
                  >
                    {
                      offers?.partial?.map((book) => (
                        <CoincidencesItem
                          name={book.BookName}
                          city={book.OfferUser.CityName}
                          rating={book.OfferUser.Rating}
                          key={book.OfferID}
                          book={book}
                        />
                      )) || null
                    }
                  </Grid>
                </>
              ) : null}
              { offers?.another?.length ? (
                <>
                  <Grid item xs={12} sx={{ height: 50 }}>
                    <Header>Другие интересные предложения</Header>
                  </Grid>
                  <Grid
                    container
                    xs={8}
                    sx={{
                      m: 2,
                      maxHeight: 300,
                      overflow: 'scroll',
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderRadius: 4,
                    }}
                    spacing={2}
                  >
                    {
                      offers?.another?.map((book) => (
                        <CoincidencesItem
                          name={book.BookName}
                          city={book.OfferUser.CityName}
                          rating={book.OfferUser.Rating}
                          key={book.OfferID}
                          book={book}
                          author={book.Author}
                        />
                      )) || null
                    }
                  </Grid>
                </>
              ) : null}
            </>
          )
          : null
      }
    </Grid>
  );
}
