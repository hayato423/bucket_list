import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Item = (props) => {
  const { data, clickButton } = props;

  return (
    <div className="my-5">
      <div>
        <Link to={'/list/' + data.list_id} className="list_link">{data.list_title}</Link>
        <button onClick={() => clickButton(data.list_id)} className="btn btn-danger ml-5">☓</button>
      </div>
      <div>
        <meter value={data.done/data.total} className="list_meter"></meter>
        {(data.done === data.total) && <span class="all_achieved_icon px-2 py-2 ml-2 my-5">全部達成！</span>}
      </div>
    </div>
  )
}


export default Item;