import React from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Test from './components/test/test';
import Test2  from './components/Test2/Test2';
import Hello from './components/Hello/Hello';
import Home from './components/Home/Home';

function App() {
  return(
  <div className="App">
    <Router>
      <Route exact path="/" component={Test}></Route>
      <Route path="/test2" component={Test2}></Route>
      <Route path="/hello" component={Hello}></Route>
      <Route path="/home" component={Home}></Route>
    </Router>
  </div>
  );
}

export default App;