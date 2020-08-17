import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = (props) => {
  const { data, clickButton } = props;

  return (
    <div>
      <div>
        <Link to={'/list/' + data.list_id} ><span>{data.list_title}</span></Link>
        <button onClick={() => clickButton(data.list_id)}>削除</button>
      </div>
      <div>
        <meter value={data.done/data.total}></meter>
      </div>
    </div>
  )
}


export default Item;