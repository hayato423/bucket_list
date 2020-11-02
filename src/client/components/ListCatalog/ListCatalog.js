import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import './style.css';
import host from '../../../host';

const ListCatalog = () => {
  const [bucketLists, setBucketLists] = useState([]);
  const [doDelete, setDoDelete] = useState(false);

  useEffect(() => {
    const fetchBucketLists = async () => {
      try {
        const result = await axios.get(`http://${host.addres}/api/listcatalog`)
        console.log(result.data);
        setBucketLists(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBucketLists();
  }, [doDelete,])

  const deleteList = async (list_id) => {
    const confirm = window.confirm("本当に削除しますか？");
    if (confirm === true) {
      const result = await axios.delete(`http://${host.addres}/api/deletelist/${list_id}`)
        .catch((err) => {
          alert(err);
        });
      setDoDelete(!doDelete);
    }
  }

  return (
    <div className="text-center listcatalog">
      <h2 className="title">バケツリスト一覧</h2>
      {bucketLists.map((data,index) => <Item data={data} clickButton={(list_id)=> deleteList(list_id)} key={index}/>)}
    </div>
  );
}


export default ListCatalog;