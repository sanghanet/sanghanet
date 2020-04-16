import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FinanceDashboard from '../../components/FinanceDashboard/FinanceDashboard';

const Finances = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finances"/>
            <Navbar navStyle="sidenav"/>
            <main className="align">
                <FinanceDashboard/>
            </main>
            <Footer />
        </div>
    );
};

export default Finances;
