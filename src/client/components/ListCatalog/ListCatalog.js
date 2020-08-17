import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListCatalog = () => {
  const [bucketLists, setBucketLists] = useState([]);
  const [doDelete, setDoDelete] = useState(false);

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
  }, [doDelete])

  const deleteList = async (list_id) => {
    const confirm = window.confirm("本当に削除しますか？");
    if (confirm === true) {
      const result = await axios.delete(`http://127.0.0.1:3000/api/deletelist/${list_id}`)
        .catch((err) => {
          alert(err);
        });
      setDoDelete(!doDelete);
    }
  }

  return (
    <div>
      <h1>バケツリスト一覧</h1>
      {bucketLists.map((bucketList, index) => <div key={index}><Link to={'/list/' + bucketList.list_id} >{bucketList.list_title}</Link><button onClick={() => deleteList(bucketList.list_id)}>削除</button></div>)}
    </div>
  );
}


export default ListCatalog;