import React from 'react';

import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const AdminYoga = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Yoga Admin" />
            <Navbar navStyle="sidenav" openSubmenu={true} />
            <main className="align">
                <ComingSoon pageName = "Yoga Admin" isPlural = {false} />
            </main>
        </div>
    );
};

export default AdminYoga;
