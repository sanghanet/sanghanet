import React from 'react';
import Client from '../../components/Client';

import { ReactComponent as LogoutIcon } from '../icons/logout.svg';

const Logout = (props) => {
    const handleClick = (event) => {
        Client.fetch('/user/logout')
            .then((res) => {
                sessionStorage.clear();
                if (res.ok) { window.location.href = '/'; }
            })
            // eslint-disable-next-line handle-callback-err
            .catch((err) => {
                sessionStorage.clear();
                window.location.href = '/';
            });
    };
    return (
        <button className="link" onClick={handleClick}>
            <div className="menu-icon"><LogoutIcon /></div>
            <span className="title">Logout</span>
        </button>
    );
};

export default Logout;
