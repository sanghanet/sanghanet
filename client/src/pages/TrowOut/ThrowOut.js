import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

const ThrowOut = () => {
    const { reason } = useParams();
    const { throwoutMessages } = useContext(UIcontext).dictionary;

    setTimeout(() => { window.location.href = '/'; }, 3000);

    return (<h1>{throwoutMessages[reason.toUpperCase()]}</h1>);
};

export default ThrowOut;
