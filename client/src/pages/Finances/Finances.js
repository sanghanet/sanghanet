import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import ComingSoon from '../../components/ComingSoon';

const Finances = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Finances"/>
            <Navbar/>
            <main className="align">
                <ComingSoon pageName = "Finances" isPlural = {true}/>
            </main>
        </div>
    );
};

export default Finances;
