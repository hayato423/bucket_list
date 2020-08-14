import React, { useEffect, useState } from "react";
import axios from 'axios';

export const Root = () => {

    return (
        <div>
            <h1>React!!</h1>
            <a href='/twitter/auth'>twitterでログイン</a>
        </div>
    );
};

export default Root;