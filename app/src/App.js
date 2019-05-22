import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import Home from './views/Home';
import PrivateRoute from './PrivateRoute';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import Tabs from './components/Tabs/Tabs';

//style
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <PrivateRoute exact path="/tabs" component={Tabs} />
      </div>
    </Router>
  );
}

export default App;
