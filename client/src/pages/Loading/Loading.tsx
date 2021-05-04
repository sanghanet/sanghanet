import React, { useEffect, useContext } from 'react';

import Client from '../../components/Client';
import { Spinner } from 'react-bootstrap';
import './Loading.scss';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

const Loading: React.FC = () => {
    const { generalTermsDictionary } = useContext(UIcontext).dictionary;

    useEffect(() => {
        Client.fetch('/user/login', { method: 'POST' })
            .then((user) => {
                if (Object.prototype.hasOwnProperty.call(user, 'status')) {
                    sessionStorage.setItem('userStatus', user.status);
                    window.location.href = user.status === 'registered' ? '/app/personal' : '/registration';
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
