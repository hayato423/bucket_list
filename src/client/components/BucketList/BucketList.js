import React, { useEffect, useState,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './style.css';

const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [onClick, setOnClick] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [achievedItem, setAchievedItem] = useState('');
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);
  const [twitterHref,setTwitterHref] = useState('#');

  const params = useParams();
  const list_id = params.id;

  useEffect(() => {
    const itemFetch = async () => {
      const result = await axios.get(`http://127.0.0.1:3000/api/list/${list_id}`)
        .catch(err => {
          console.log(err);
        });
      //console.log(result.data);
      //console.log(result.data[0].list_title);
      setListTitle(result.data[0].list_title);
      setBucketList(result.data);
    }
    itemFetch();
  }, [onClick])

  useEffect(() => {
    const encodedStr = encodeURIComponent(achievedItem);
    setTwitterHref('https://twitter.com/intent/tweet?text='+encodedStr);
  },[achievedItem])

  const achievement = async (list_id, item_id, item_name) => {
    const result = await axios.put(`http://127.0.0.1:3000/api/achievement/${list_id}/${item_id}`);
    setOnClick(!onClick);
    if (result.status == 200) {
      setAchievedItem(item_name);
      handleShow();
    }
  }

  return (
    <div>
      <h2 className="title text-center">{listTitle}</h2>
      <ul className="list-group">

      </ul>
      <table className="table table-striped">
        <tbody>
          {bucketList.map((content) => {
            let isDoneElement;
            if (parseInt(content.is_done, 10) === 0) {
              isDoneElement = <input type="button" value="達成！" onClick={() => achievement(list_id, content.item_id, content.item)} className="ml-3 achieve_btn py-1 px-2" />
            } else {
              isDoneElement = <span className="ml-3 achieved py-2 px-2">達成済み</span>
            }
            return (
              <tr key={content.item_id}>
                <td>{content.item_id}</td>
                <td>{content.item}</td>
                <td>{isDoneElement}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={modalShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>{achievedItem}</h1>
            <h2>達成おめでとうございます！</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a  id="twitter-share-button" className="twitter-share-button" href={twitterHref}>Tweet</a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BucketList;