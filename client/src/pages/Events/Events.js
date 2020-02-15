import React from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import ComingSoon from '../../components/ComingSoon';

const Events = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Events"/>
            <Navbar/>
            <main className="align">
                <ComingSoon pageName = "Events" isPlural = {true}/>
            </main>
        </div>
    );
};

export default Events;
