import React ,{useEffect,useState}from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

const BucketList = () => {
  const [bucketList,setBucketList] = useState([]);
  const params = useParams();
  const list_id = params.id;

  useEffect(()=> {
    const itemFetch = async () => {
      const result = await axios.get(`http://127.0.0.1:3000/api/list/${list_id}`)
        .catch(err => {
          console.log(err);
        });
      console.log(result);
      setBucketList(result.data);
    }
    itemFetch();
  },[])

  return (
    <div>
      <div>bukcetlist</div>
      <ul>
      {bucketList.map((content)=><li key={content.item_id}>{content.item}</li>)}
      </ul>
    </div>
  );
}

export default BucketList;