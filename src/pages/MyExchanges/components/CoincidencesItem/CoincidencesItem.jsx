import React, { useCallback, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setBook } from '../../../../store/slices/exchangesSlice';

export default function CoincidencesItem({
  name, city, rating, type, book,
}) {
  const dispatch = useDispatch();
  const Header = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const title = useMemo(() => {
    switch (type) {
      case 'full':
        return 'Полное совпадение';
      case 'partial':
        return 'Частичное совпадение';
      default:
        return 'Другие интересные предложения';
    }
  }, [type]);

  const handleCoincidence = useCallback(() => {
    dispatch(setBook(book));
  }, [book]);

  return (
    <>
      { type ? (
        <Grid item xs={12}>
          <Header>{title}</Header>
        </Grid>
      ) : null}
      <Grid item xs={3}>
        <Item>{name}</Item>
      </Grid>
      <Grid item xs={3}>
        <Item>{city}</Item>
      </Grid>
      <Grid item xs={3}>
        <Item>{`рейтинг ${rating}`}</Item>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="info" onClick={handleCoincidence}>Меняюсь</Button>
      </Grid>
    </>
  );
}

CoincidencesItem.defaultProps = {
  type: undefined,
};

CoincidencesItem.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string,
  book: PropTypes.shape({
    OfferID: PropTypes.number.isRequired,
    BookName: PropTypes.string.isRequired,
    OfferUser: PropTypes.shape({
      CityName: PropTypes.string.isRequired,
      Rating: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
