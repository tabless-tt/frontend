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
      </div>

        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        
    </Router>
  );
}

export default App;
