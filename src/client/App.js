import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router , Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import CreateList from './components/CreateList/CreateList';
import ListCatalog from './components/ListCatalog/ListCatalog';
import BucketList from './components/BucketList/BucketList';

function App() {
  const [isLogin,SetIsLogin] = useState(false);

  useEffect(() => {
    const  confirmLogin =  async () => {
      try{
        const result = await axios.get('http://127.0.0.1:3000/api/user');
        SetIsLogin((result.status == 200) ? true : false);
      }catch(err){
        SetIsLogin(false);
      }
    }

    confirmLogin();
  },[])

  return(
  <div className="App">
    <Router>
      <Route exact path="/" render={() => (isLogin ? (<Redirect to="/home" />) : (<Root/>))} />
      <Route path="/createlist" render={() => (isLogin ? (<CreateList/>): (<Redirect to="/"/>))} />
      <Route path="/home" render={() => (isLogin ? (<Home/>) : (<Redirect to="/" />))} />
      <Route path="/listcatalog" render={() => (isLogin ? (<ListCatalog/>) : (<Redirect to="/" />))} />
      <Route path="/list/:id" render={() => (isLogin ? (<BucketList/>) : (<Redirect to="/" />))} />
    </Router>
  </div>
  );
}

export default App;