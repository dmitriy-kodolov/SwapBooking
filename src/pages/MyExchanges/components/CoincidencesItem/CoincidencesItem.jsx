import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setBook } from '../../../../store/slices/exchangesSlice';

export default function CoincidencesItem({
  name, city, rating, book, author,
}) {
  const dispatch = useDispatch();

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const handleCoincidence = useCallback(() => {
    dispatch(setBook(book));
  }, [book]);

  return (
    <>
      <Grid item xs={2}>
        <Item>{name}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>{author}</Item>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Item>{city}</Item>
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Item>{`рейтинг ${rating}`}</Item>
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
        <Button variant="contained" color="info" sx={{ maxHeight: '40px' }} onClick={handleCoincidence}>Меняюсь</Button>
      </Grid>
    </>
  );
}

CoincidencesItem.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  book: PropTypes.shape({
    OfferID: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    BookName: PropTypes.string.isRequired,
    OfferUser: PropTypes.shape({
      CityName: PropTypes.string.isRequired,
      Rating: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
