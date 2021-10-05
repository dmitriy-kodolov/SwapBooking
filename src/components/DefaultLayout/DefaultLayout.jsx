/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../../pages/NavBar';

const DefaultLayout = (props) => (
  <>
    <NavBar />
    <Route {...props} />
  </>
);
export default DefaultLayout;
