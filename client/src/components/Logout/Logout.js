import React, { useContext } from 'react';
import Client from '../../components/Client';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

import { ReactComponent as LogoutIcon } from '../icons/logout.svg';

const Logout = (props) => {
    const { navbarDictionary } = useContext(UIcontext).dictionary;

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
            <span className="title">{navbarDictionary.LOGOUTLABEL}</span>
        </button>
    );
};

export default Logout;
