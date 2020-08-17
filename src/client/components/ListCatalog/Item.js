import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = (props) => {
  const {data,clickButton} = props;

  return (
    <div>
      <Link to={'/list/' + data.list_id} >{data.list_title}</Link>
      <button onClick={() => clickButton(data.list_id)}>削除</button>
    </div>
  )
}


export default Item;