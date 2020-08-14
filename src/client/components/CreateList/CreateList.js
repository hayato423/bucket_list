import React ,{useState,useEffect}from 'react';
import axios from 'axios';


export const CreateList = () => {
  const [title,setTitle] = useState('');
  const [itemList,setItemList] = useState([]);
  const [item,setItem] = useState('');

  const addItem = () => {
    if(item != ''){
      setItemList([...itemList,item]);
      setItem('');
    }
  }

  const deleteItem = (index) => {
    var newList = itemList.slice(0,itemList.length);
    newList.splice(index,1);
    setItemList(newList);
  }

  const postBucketList = async () =>{
    const bucketListJson = {
      title : title,
      items : itemList
    }
    const result = await axios.post('http://127.0.0.1:3000/api/createlist',bucketListJson)
      .catch(err => {
        alert(err);
      });
    if(result.status != 200){
      console.log("error!");
    }else{
      alert('バケツリストを作成しました');
    }
  }


  return (
    <div>
      <h1>バケツリスト作成</h1>
      <form >
        <label>タイトル</label>
        <input type="text" onChange={() => setTitle(event.target.value)} value={title}/>
        <br></br>
        <label>項目</label>
        <input type="text" onChange={() => setItem(event.target.value)} value={item} />
        <input type="button" value="+" onClick={() => addItem() } />
      </form>
      <ul>{itemList.map((item,index)=><li key={index}>{item}<input type="button" value="☓" onClick={()=> deleteItem(index)}/></li>)}</ul>
      <input type="button" value="投稿" onClick={() => postBucketList()} />
    </div>
  );

};



export default CreateList;