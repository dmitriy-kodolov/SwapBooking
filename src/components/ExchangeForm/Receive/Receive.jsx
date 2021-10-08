/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-useless-path-segments */
import { Paper } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Category from '../../../components/Category';

const useStyle = makeStyles({
  paper: {
    overflow: 'auto',
    height: '300px',
    margin: '15px',
    padding: '15px',
    width: '450px',

  },
});
const Receive = ({ control, setCategorFromRecive, categorFromRecive }) => {
  const style = useStyle();
  return (
    <div>
      <Paper elevation={4} className={style.paper}>
        <Category categorFromRecive={categorFromRecive} setCategorFromRecive={setCategorFromRecive} name="receiveCategor" control={control} />
      </Paper>

    </div>
  );
};
export default Receive;
