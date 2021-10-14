import React from 'react';
import { Grid } from '@mui/material';
import CoincidencesItem from '../CoincidencesItem/CoincidencesItem';

export default function CoincidencesList() {
  const items = {
    full: [
      {
        id: 1,
        name: 'Книга 1',
        city: 'Ульяновск',
        rating: 2,
      },
      {
        id: 2,
        name: 'Книга 2',
        city: 'Ульяновск',
        rating: 3,
      },
    ],
    partial: [
      {
        id: 3,
        name: 'Книга 1',
        city: 'Ульяновск',
        rating: 2,
      },
      {
        id: 4,
        name: 'Книга 2',
        city: 'Ульяновск',
        rating: 3,
      },
    ],
    another: [
      {
        id: 5,
        name: 'Книга 1',
        city: 'Ульяновск',
        rating: 3,
      },
      {
        id: 6,
        name: 'Книга 2',
        city: 'Ульяновск',
        rating: 3,
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      {Object.entries(items).map(([key, value]) => value?.length && value.map(({
        name, city, rating, id,
      }, index) => (
        <CoincidencesItem
          name={name}
          city={city}
          rating={rating}
          key={id}
          type={index === 0 && key}
        />
      )))}
    </Grid>
  );
}
