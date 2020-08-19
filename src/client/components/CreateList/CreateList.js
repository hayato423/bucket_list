import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import "./style.css";


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
    setItemList([]);
    setTitle('');
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
    <div className="createlist text-center">
      <h2 className="createlist_title">バケツリスト作成</h2>
      <form >
        <table>
          <tr>
            <th className="px-3"><label>タイトル</label></th>
            <th><input className="input_textbox" type="text" onChange={() => setTitle(event.target.value)} value={title}/></th>
          </tr>
          <tr>
            <th><label className="px-3">項目</label></th>
            <th><input className="input_textbox" type="text" onChange={() => setItem(event.target.value)} value={item} /></th>
            <th><input className="btn btn-primary" type="button" value="+" onClick={() => addItem() } /></th>
          </tr>
        </table>
      </form>
      <ul className="list-group">{itemList.map((item,index)=><li className="list-group-item" key={index}>{item}<input className="btn btn-danger ml-3" type="button" value="☓" onClick={()=> deleteItem(index)}/></li>)}</ul>
      <input className="btn btn-success" type="button" value="作成" onClick={() => postBucketList()} />
    </div>
  );

};



export default CreateList;