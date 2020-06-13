import React from 'react';

import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const AdminEvent = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Event Admin" />
            <Navbar navStyle="sidenav" openSubmenu={true} />
            <main className="align">
                <ComingSoon pageName = "Event Admin" isPlural = {false} />
            </main>
        </div>
    );
};

export default AdminEvent;
