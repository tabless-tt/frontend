import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//Components
import PrivateRoute from './PrivateRoute';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import Tabs from './components/Tabs/Tabs';

//style
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <h1>Tabless Thursday</h1>
          <ul className="page-links">
            <li>
              <Link to="/login"> Login </Link>
            </li>
            <li>
              <Link to="/signup"> Sign Up </Link>
            </li>
          </ul>
        </div>

        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
        <PrivateRoute exact path="/tabs" component={Tabs} />
      </div>
    </Router>
  );
}

export default App;
