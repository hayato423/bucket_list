import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import CreateList from '../CreateList/CreateList';
import listCatalog from '../ListCatalog/ListCatalog';
import BucketList from '../BucketList/BucketList';
import SideBar from '../SideBar/SideBar';
import ListCatalog from '../ListCatalog/ListCatalog';

const Home = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:3000/api/user');
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
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/createlist">
                <CreateList/>
              </Route>
              <Route path="/home">
                <ListCatalog/>
              </Route>
              <Route path="/list/:id">
                <BucketList/>
              </Route>
            </Switch>
            {/* <Route path="/createlist" component={<CreateList/>} />
            <Route path="/home" component={<ListCatalog/>} />
            <Route path="/list/:id" component={<BucketList/>} /> */}
          </div>
        </div>
      </Router>

    </div>
  );
}

export default Home;