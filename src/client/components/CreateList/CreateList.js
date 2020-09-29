import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import "./style.css";
import ip from '../../../ipaddress';

export const CreateList = () => {
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [twitterHref, setTwitterHref] = useState('#');
  const [posted, setPosted] = useState(false);

  const handleShow = () => setModalShow(true);
  const handleClose = () => {
    setItemList([]);
    setTitle('');
    setModalShow(false);
  }

  const addItem = () => {
    if (item != '') {
      if (item.length < 1 || item.length > 50) {
        alert('1文字以上50文字以内で入力してください');
      } else {
        setItemList([...itemList, item]);
        setItem('');
      }
    }
  }

  const deleteItem = (index) => {
    var newList = itemList.slice(0, itemList.length);
    newList.splice(index, 1);
    setItemList(newList);
  }

  useEffect(() => {
    const encodedStr = encodeURIComponent(`バケツリスト「${title}」を作成しました\n#バケツリストメーカー\nbucketlistmaker.net`);
    setTwitterHref('https://twitter.com/intent/tweet?text=' + encodedStr);
  }, [posted])

  const postBucketList = async () => {
    if (title.length < 1 || title.length > 50) {
      alert('タイトルは1文字以上50文字以内で入力してください');
    } else {
      if (itemList.length < 1) {
        alert('１つ以上項目を追加してください')
      } else {
        const bucketListJson = {
          title: title,
          items: itemList
        }
        const result = await axios.post(`http://${ip.ipAddres}/api/createlist`, bucketListJson)
          .catch(err => {
            alert(err);
          });
        if (result.status != 200) {
          console.log("error!");
        } else {
          //alert('バケツリストを作成しました');
          setPosted(true);
          handleShow();
        }
      }
    }
  }


  return (
    <div className="createlist text-center">
      <h2 className="createlist_title">バケツリスト作成</h2>
      <form >
        <table align="center">
          <tr>
            <th className="px-3 createList_th"><label>タイトル</label></th>
            <th className="createList_th"><input className="input_textbox" type="text" onChange={() => setTitle(event.target.value)} value={title} /></th>
          </tr>
          <tr>
            <th className="createList_th px-3"><label>項目</label></th>
            <th className="createList_th"><input className="input_textbox" type="text" onChange={() => setItem(event.target.value)} value={item} /></th>
            <th className="createList_th"><input className="btn btn-primary" type="button" value="+" onClick={() => addItem()} /></th>
          </tr>
        </table>
      </form>
      <ul className="list-group">{itemList.map((item, index) => <li className="list-group-item" key={index}>{item}<input className="btn btn-danger ml-3" type="button" value="☓" onClick={() => deleteItem(index)} /></li>)}</ul>
      <input className="btn btn-success" type="button" value="作成" onClick={() => postBucketList()} />

      <Modal show={modalShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h1>{title}</h1>
            <h2>作成しました！</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => handleClose()}>close</button>
          <a className="twitter-share-button btn btn-primary" href={twitterHref}><i class="fab fa-twitter mr-1"></i>Tweet</a>
        </Modal.Footer>
      </Modal>
    </div>
  );

};



export default CreateList;