import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';

const Queries = (props) => {
    return (
        <div>
            <Header activePage="Queries" />
            <Navbar />
            <main className="align">
                <ComingSoon pageName = "Queries" isPlural = {true}/>
            </main>
        </div>
    );
};

export default Queries;
