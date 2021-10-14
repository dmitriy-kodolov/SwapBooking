import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

export default function CoincidencesItem({
  name, city, rating, type,
}) {
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

  return (
    <>
      { type ? (
        <Grid item xs={12}>
          <Header>{title}</Header>
        </Grid>
      ) : null}
      <Grid item xs={4}>
        <Item>{name}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{city}</Item>
      </Grid>
      <Grid item xs={4}>
        <Item>{`рейтинг ${rating}`}</Item>
      </Grid>
    </>
  );
}

CoincidencesItem.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
