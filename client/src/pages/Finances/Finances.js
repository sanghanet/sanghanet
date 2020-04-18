import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FinanceDashboard from '../../components/FinanceDashboard/FinanceDashboard';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import TransactionTabs from '../../components/TransactionTabs/TransactionTabs';

const Finances = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finances"/>
            <Navbar navStyle="sidenav"/>
            <main className="align">
                <FinanceDashboard/>
                <TransactionTabs/>
            </main>
            <Footer />
        </div>
    );
};

export default Finances;
