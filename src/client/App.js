import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation, Switch,} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import ip from '../ipaddress';

function App() {
  const [isLogin, SetIsLogin] = useState(false);


  useEffect(() => {
    const confirmLogin = async () => {
      try {
        const result = await axios.get('http://'+ip.ipAddres+'/api/user');
        console.log(result);
        SetIsLogin((result.data.id != undefined) ? true : false);
      } catch (err) {
        SetIsLogin(false);
      }
    }

    confirmLogin();
  }, [])

  return (
    <div className="App container">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/*" render={() => (isLogin ? (<Home />) : (<Root />))} />
          {/* <Route path="/*" render={() => (isLogin ? (<Home />) : (<Redirect to="/" />))} /> */}
          {/* <Route path="/*" component={Home} /> */}
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;