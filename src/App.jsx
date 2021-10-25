import React, { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoTab from './pages/LogoTab';
import NavBar from './pages/NavBar';
import MainPage from './pages/MainPage';
import StartExchange from './pages/StartExchange';
import MyExchange from './pages/MyExchanges';
import QuestionTab from './pages/QuestionTab';
import { fetchAllOffersId } from './store/slices/exchangesSlice';
import { setAlert } from './store/slices/alertSlice';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const userId = useSelector(((state) => state.login.userId));
  const intervalId = useRef(-1);

  useEffect(async () => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(async () => {
      try {
        if (userId) {
          await dispatch(fetchAllOffersId(userId)).unwrap();
        }
      } catch (err) {
        dispatch(setAlert({ text: `Не удалось загрузить список, ${err.message}`, severity: 'error' }));
      }
    }, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [dispatch, userId]);

  return (
    <>
      <Router>
        <div>
          <LogoTab />
          <NavBar />
        </div>
        <Switch>
          <Route exact path="/main" component={MainPage} />
          <Route path="/startExchange" component={isLogin ? StartExchange : () => null} />
          <Route path="/questionTab" component={QuestionTab} />
          <Route path="/myExchanges" component={isLogin ? MyExchange : () => null} key="myExchanges" />
          <Redirect to="/main" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
