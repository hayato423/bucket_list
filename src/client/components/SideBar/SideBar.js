import React from 'react';
import { Route, Router, Link } from 'react-router-dom';
import "./style.css";
import bucket_img from './bucket.png'

const SideBar = () => {
  return (
    <div className="sidebar text-center pt-5">
      <img src={bucket_img} className="img-fluid bucket_img" />
      <div className="py-5 px-3">
      <Link to='/' className="button py-3 px-2">バケツリスト一覧</Link>
      </div>
      <div className="py-5 px-3">
      <Link to='/createlist' className="button py-3 px-2">バケツリスト作成</Link>
      </div>
    </div>
  )
}

export default SideBar;