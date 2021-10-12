import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import MainPage from './pages/MainPage';
import StartExchange from './pages/StartExchange';
import MyExchange from './pages/MyExchanges';
import QuestionTab from './pages/QuestionTab';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <DefaultLayout exact path="/main" component={MainPage} />
          <DefaultLayout exact path="/startExchange" component={StartExchange} />
          <DefaultLayout exact path="/myExchanges" component={MyExchange} />
          <DefaultLayout exact path="/questionTab" component={QuestionTab} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
