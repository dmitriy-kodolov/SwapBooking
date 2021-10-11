import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import LogoTab from './pages/LogoTab';
import NavBar from './pages/NavBar';
import MainPage from './pages/MainPage';
import StartExchange from './pages/StartExchange';
import MyExchange from './pages/MyExchanges';
import QuestionTab from './pages/QuestionTab';

function App() {
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
          <Route path="/myExchanges" component={MyExchange} />
          <Route path="/questionTab" component={QuestionTab} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
