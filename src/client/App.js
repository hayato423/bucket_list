import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Root from './components/Root/Root';
import Home from './components/Home/Home';

function App() {
  const [isLogin, SetIsLogin] = useState(false);

  useEffect(() => {
    const confirmLogin = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:3000/api/user');
        SetIsLogin((result.status == 200) ? true : false);
      } catch (err) {
        SetIsLogin(false);
      }
    }

    confirmLogin();
  }, [])

  return (
    <div className="App container">
      <Header/>
      <Router>
      <Route exact path="/" render={() => (isLogin ? (<Redirect to="/home" />) : (<Root />))} />
      <Route path="/home" render={() => (isLogin ? (<Home />) : (<Redirect to="/" />))} />
      </Router>
    </div>
  );
}

export default App;