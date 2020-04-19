import React from 'react';

import Client from '../../components/Client';
import { Spinner } from 'react-bootstrap';
import './Loading.scss';

class Loading extends React.Component {
    componentDidMount () {
        Client.fetch('/user/login', { method: 'POST' })
            .then((user) => {
                if (user.name) {
                    sessionStorage.setItem('user', user.name);
                    sessionStorage.setItem('isSuperuser', user.isSuperuser);
                    if (user.name === 'Unknown') {
                        window.location.href = '/registration';
                    } else {
                        window.location.href = '/personal';
                    }
                } else {
                    window.location.href = '/loginfailed';
                }
            })
            .catch((err) => {
                console.log(err.message);
                window.location.href = '/';
            });
    }

    render () {
        return (
            <div className="loading-box">
                <Spinner animation="border" />
                <h1>Loading...</h1>
            </div>
        );
    }
};

export default Loading;
