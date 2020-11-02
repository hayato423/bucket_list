import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation, Switch,} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { login, logout } from './actions/login'
import axios from 'axios';
import Header from './components/Header/Header';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import host from '../host';

function App() {
  // const [isLogin, SetIsLogin] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.login.isLogin);


  useEffect(() => {
    const confirmLogin = async () => {
      try {
        const result = await axios.get('http://'+host.addres+'/api/user');
        // SetIsLogin((result.data.id != undefined) ? true : false);
        if(result.data.id != undefined) dispatch(login());
      } catch (err) {
        console.log(err);
      }
    }

    confirmLogin();
  }, [])

  return (
    <div className="App container">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/*" render={() => (isLogin ? (<Home />) : (<Root islogin={false} />))} />
          {/* <Route path="/*" render={() => (isLogin ? (<Home />) : (<Redirect to="/" />))} /> */}
          {/* <Route path="/*" component={Home} /> */}
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;