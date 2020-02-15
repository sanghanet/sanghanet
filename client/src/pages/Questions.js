import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';

const Questions = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Questions"/>
            <Navbar/>
            <main className="align">
                <ComingSoon pageName = "Questions" isPlural = {true}/>
            </main>
        </div>
    );
};

export default Questions;
