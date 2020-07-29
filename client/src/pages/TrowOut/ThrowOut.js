import React, { useEffect, useState } from 'react';

const ThrowOut = (props) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // getting url
        let url = window.location.href;
        // getting message from the end of it
        url = url.substring(url.indexOf('throwout') + 9, url.length);
        // capitalizing first letter and replacing '+' with spaces
        url = (url[0].toUpperCase() + url.substring(1)).split('+').join(' ');

        setMessage(url);

        setTimeout(() => { window.location.href = '/'; }, 3000);
    }, []);

    return (
        <h1>{message}</h1>
    );
};

export default ThrowOut;
