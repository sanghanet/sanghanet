import React, { useEffect, useContext } from 'react';

import Client from '../../components/Client';
import { Spinner } from 'react-bootstrap';
import './Loading.scss';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

const Loading = () => {
    const { generalTermsDictionary } = useContext(UIcontext).dictionary;
    useEffect(() => {
        Client.fetch('/user/login', { method: 'POST' })
            .then((user) => {
                if (user.name) {
                    sessionStorage.setItem('user', user.name);
                    if (user.name === 'Unknown') {
                        window.location.href = '/registration';
                    } else {
                        window.location.href = '/app/personal';
                    }
                } else {
                    window.location.href = '/throwout/loginfailed';
                }
            })
            .catch((err) => {
                console.log(err.message);
                window.location.href = '/';
            });
    }, []);

    return (
        <div className="loading-box">
            <Spinner animation="border" />
            <h1>{`${generalTermsDictionary.LOADING}...`}</h1>
        </div>
    );
};

export default Loading;
