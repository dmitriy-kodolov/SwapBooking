import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    textDecoration: 'none',
  },
});

const NotFound = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h2>Страница не найдена</h2>
      <Link className={styles.test} to="/main">На главную</Link>
    </div>
  );
};
export default NotFound;
