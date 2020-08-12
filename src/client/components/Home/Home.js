import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [name,setName] = useState('');
  const [id,setId] = useState('');

  useEffect(()=> {
    const fetchData = async () => {
        try {
            const result = await axios.get('http://127.0.0.1:3000/api/user');
            console.log(result);
            setName(result.data.displayName);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
},[])

  return(
    <div>
      <h1>ようこそ,{name}さん</h1>
      <p></p>
    </div>
  );
}

export default Home;