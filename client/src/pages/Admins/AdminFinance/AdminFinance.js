import React from 'react';

import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const AdminFinance = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finance Admin" />
            <Navbar navStyle="sidenav" />
            <main className="align">
                <ComingSoon pageName = "Finance Admin" isPlural = {false} />
            </main>
        </div>
    );
};

export default AdminFinance;
