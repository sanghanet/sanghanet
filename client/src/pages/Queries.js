import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';

const Queries = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Queries" />
            <Navbar />
            <main>
                <ComingSoon pageName = "Queries" isPlural = {true}/>
            </main>
        </div>
    );
};

export default Queries;
