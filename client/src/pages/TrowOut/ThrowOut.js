import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ThrowOut = (props) => {
    const [messageToDisplay, setMessageToDisplay] = useState('');
    const { message } = useParams();

    useEffect(() => {
        setMessageToDisplay((message[0].toUpperCase() + message.substring(1)).split('+').join(' '));
        setTimeout(() => { window.location.href = '/'; }, 3000);
    }, [message]);

    return (<h1>{messageToDisplay}</h1>);
};

export default ThrowOut;
