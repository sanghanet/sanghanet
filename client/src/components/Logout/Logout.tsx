import React, { useContext } from 'react';
import Client from '../../components/Client';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

import { ReactComponent as LogoutIcon } from '../icons/logout.svg';

const Logout: React.FC = () => {
    const { pageAndNavbarTitles } = useContext(UIcontext).dictionary;
    const { LOGOUT } = pageAndNavbarTitles;

    const handleClick = (): void => {
        Client.fetch('/user/logout')
            .then((res) => {
                sessionStorage.clear();
                if (res.ok) { window.location.href = '/'; }
            })
            .catch(() => {
                sessionStorage.clear();
                window.location.href = '/';
            });
    };
    return (
        <button className="link" onClick={handleClick}>
            <div className="menu-icon"><LogoutIcon /></div>
            <span className="title">{LOGOUT}</span>
        </button>
    );
};

export default Logout;
