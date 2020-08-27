import React from 'react';
import { Route, Router, Link } from 'react-router-dom';
import "./style.css";
import bucket_img from './bucket.png'

const SideBar = () => {
  return (
    <div className="sidebar text-center pt-5">
      <img src={bucket_img} className="img-fluid bucket_img" />
      <div className="row">
      <Link to='/' className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-1 col-4 offset-1">バケツリスト一覧</Link>
      <Link to='/createlist' className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-2 col-4 offset-2">バケツリスト作成</Link>
      </div>
    </div>
  )
}

export default SideBar;