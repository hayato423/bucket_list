import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch,useLocation } from 'react-router-dom';
import axios from 'axios';
import CreateList from '../CreateList/CreateList';
import listCatalog from '../ListCatalog/ListCatalog';
import BucketList from '../BucketList/BucketList';
import SideBar from '../SideBar/SideBar';
import ListCatalog from '../ListCatalog/ListCatalog';
import './style.css';
import ip from '../../../ipaddress';

const Home = () => {
  const [name, setName] = useState('');

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${ip.ipAddres}/api/user`);
        //console.log(result);
        setName(result.data.displayName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="home container">
      <Router>
        <div className="row">
          <div className="col-md-3 py-0 px-0">
            <SideBar />
          </div>
          <div className="col-md-9 py-0 px-0 main_contents">
            <Switch>
              <Route exact path="/">
                <ListCatalog />
              </Route>
              <Route exact path="/createlist">
                <CreateList />
              </Route>
              <Route  exact path="/list/:id">
                <BucketList />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default Home;