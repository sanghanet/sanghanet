import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Finances = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finances"/>
            <Navbar navStyle="sidenav"/>
            <main className="align">
                <ComingSoon pageName = "Finances" isPlural = {true}/>
            </main>
            <Footer />
        </div>
    );
};

export default Finances;
