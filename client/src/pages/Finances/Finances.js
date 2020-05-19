import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FinanceContainer from '../../components/FinanceContainer/FinanceContainer';

const Finances = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finances"/>
            <Navbar navStyle="sidenav"/>
            <main className="align">
                <FinanceContainer/>
            </main>
            <Footer />
        </div>
    );
};

export default Finances;
