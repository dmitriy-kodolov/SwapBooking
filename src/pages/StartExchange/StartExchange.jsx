import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ExchangeForm from '../../components/ExchangeForm/ExchangeForm';

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '-5px 0 -5px 0',
  },
});

const StartExchange = () => {
  const style = useStyle();
  return (
    <div className={style.root}>
      <h3>Бланк обмена</h3>
      <ExchangeForm />
    </div>
  );
};

export default StartExchange;
