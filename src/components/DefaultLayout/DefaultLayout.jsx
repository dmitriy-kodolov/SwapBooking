/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import LogoTab from 'pages/LogoTab';
import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../../pages/NavBar';

const DefaultLayout = (props) => (
  <>
    <LogoTab />
    <NavBar />
    <Route {...props} />
  </>
);
export default DefaultLayout;
