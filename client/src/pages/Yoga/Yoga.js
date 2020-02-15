import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Yoga = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Yoga"/>
            <Navbar/>
            <main className="align">
                <ComingSoon pageName = "Yoga" isPlural = {false}/>
            </main>
        </div>
    );
};

export default Yoga;
