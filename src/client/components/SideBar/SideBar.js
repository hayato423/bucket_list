import axios from 'axios';
import React,{useState} from 'react';
import { Route, Router, Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { logout } from '../../actions/login';
import { Modal } from 'react-bootstrap';
import "./style.css";
import bucket_img from './bucket.png'

const SideBar = () => {
  const dispatch = useDispatch();
  const [logoutModal,setLogoutModal] = useState(false);

  const Logout = () => {
    axios.get('/api/logout')
    .then(() => {
      dispatch(logout());
      window.location.href = '/'
    }).catch((err)=>{
      console.log(err);
    }
    )
  }

  return (
    <div className="sidebar text-center pt-5">
      <img src={bucket_img} className="img-fluid bucket_img" />
      <div className="row">
      <Link to='/' className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-1 col-4 offset-1">ホーム</Link>
      <Link to='/listcatalog' className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-1 col-4 offset-1">バケツリスト一覧</Link>
      <Link to='/createlist' className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-2 col-4 offset-2">バケツリスト作成</Link>
      <span className="button py-3 px-2 my-5 col-md-8 offset-md-2 col-sm-4 offset-sm-2 col-4 offset-2" onClick={() => setLogoutModal(true)}>ログアウト</span>
      </div>
      <Modal show={logoutModal} onHide={() => setLogoutModal(false)} center>
        <Modal.Body>
          <p className="text-center">ログアウトしますか？</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=>Logout()}>ログアウト</button>
          <button className="btn btn-light" onClick={() => setLogoutModal(false)}>キャンセル</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SideBar;