import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router , Route,Redirect} from 'react-router-dom';
import axios from 'axios';
import Test from './components/test/test';
import Test2  from './components/Test2/Test2';
import Hello from './components/Hello/Hello';
import Home from './components/Home/Home';

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
      <Route exact path="/" render={() => (
        isLogin ? (
          <Redirect to="/home" />
        ) : (
          <Test/>
        )
      )} />
      <Route path="/home" render={() => (
        isLogin ? (
          <Home/>
        ) : (
          <Redirect to="/" />
        )
      )} />
      {/* <Route exact path="/" component={Test}></Route> */}
      <Route path="/test2" component={Test2}></Route>
      <Route path="/hello" component={Hello}></Route>
      {/* <Route path="/home" component={Home}></Route> */}
    </Router>
  </div>
  );
}

export default App;