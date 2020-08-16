import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BucketList = () => {
  const [bucketList, setBucketList] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [onClick, setOnClick] = useState(false);
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

  const achievement = async (list_id, item_id) => {
    const result = await axios.put(`http://127.0.0.1:3000/api/achievement/${list_id}/${item_id}`);
    setOnClick(!onClick);
    if (result.status == 200) {
      alert('達成おめでとうございます！');
    }
  }

  return (
    <div>
      <div>{listTitle}</div>
      <table>
        <tbody>
          {bucketList.map((content) => {
            let isDoneElement;
            if (parseInt(content.is_done, 10) === 0) {
              isDoneElement = <input type="button" value="達成！" onClick={() => achievement(list_id, content.item_id)} />
            } else {
              isDoneElement = <span>達成済み</span>
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
    </div>
  );
}

export default BucketList;