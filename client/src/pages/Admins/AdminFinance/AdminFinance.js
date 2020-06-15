import React from 'react';

import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector';

const AdminFinance = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finance Admin" />
            <Navbar navStyle="sidenav" openSubmenu={true} />
            <main className="align">
                <UserSelector />
                <FinanceContainer />
            </main>
        </div>
    );
};

export default AdminFinance;
