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
  const AuthRoutes = [
    <Route path="/myExchanges" component={MyExchange} key="myExchanges" />,
  ];

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
          <Route path="/startExchange" component={StartExchange} />
          <Route path="/questionTab" component={QuestionTab} />
          {isLogin && AuthRoutes}
          <Redirect to="/main" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
