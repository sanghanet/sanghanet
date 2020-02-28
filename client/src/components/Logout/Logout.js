import React from 'react';

import { ReactComponent as LogoutIcon } from '../icons/logout.svg';

const Logout = (props) => {
    const handleClick = (event) => {
        sessionStorage.clear();
        fetch('/user/logout')
            .then((res) => {
                if (res.ok) { window.location.href = '/'; }
            })
            .catch((err) => {
                console.log(err.message);
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
