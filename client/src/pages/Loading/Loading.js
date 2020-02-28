import React from 'react';

import { Spinner } from 'react-bootstrap';
import './Loading.scss';

class Loading extends React.Component {
    componentDidMount () {
        fetch('/user/login', { method: 'POST' })
            .then((res) => {
                if (res.ok) { return res.json(res.body); }
            })
            .then((user) => {
                if (user.name && user.isActive) {
                    sessionStorage.setItem('user', user.name);
                    sessionStorage.setItem('isActive', user.isActive);
                    sessionStorage.setItem('isSuperuser', user.isSuperuser);
                    window.location.href = '/personal';
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
