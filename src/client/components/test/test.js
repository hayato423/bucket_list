import React, { useEffect, useState } from "react";
import axios from 'axios';

export const Test = () => {
    const [data, setData] = useState('テスト');

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://127.0.0.1:3000/api');
                console.log(result);
                setData(result.data.api2);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    })

    return (
        <div>
            <h1>React!!</h1>
            <h1>{data}</h1>
            <a href='/twitter/auth'>twitter</a>
        </div>
    );
};

export default Test