import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoTab from './pages/LogoTab';
import NavBar from './pages/NavBar';
import MainPage from './pages/MainPage';
import StartExchange from './pages/StartExchange';
import MyExchange from './pages/MyExchanges';
import QuestionTab from './pages/QuestionTab';

function App() {
  const isLogin = useSelector((state) => state.login.isLogin);

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
