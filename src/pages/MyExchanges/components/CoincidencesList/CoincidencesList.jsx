import React, { useCallback, useEffect } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
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
          : Object.entries(offers)
            .map(([key, values]) => values?.length && values.map((book, index) => (
              <CoincidencesItem
                name={book.BookName}
                city={book.OfferUser.CityName}
                rating={book.OfferUser.Rating}
                key={book.OfferID}
                type={index === 0 ? key : undefined}
                book={book}
              />
            )))
      }
    </Grid>
  );
}
