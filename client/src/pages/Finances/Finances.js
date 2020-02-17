import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

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
