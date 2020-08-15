import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListCatalog = () => {
  const [bucketLists, setBucketLists] = useState([]);

  useEffect(() => {
    const fetchBucketLists = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:3000/api/listcatalog')
        console.log(result.data);
        setBucketLists(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBucketLists();
  }, [])

  return (
    <div>
      <h1>バケツリスト一覧</h1>
      {bucketLists.map((bucketList,index)=><div key={index}><Link to={'/list/' + bucketList.list_id} >{bucketList.list_title}</Link></div>)}
    </div>
  );
}


export default ListCatalog;