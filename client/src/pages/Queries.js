import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Queries = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Queries" />
            <Navbar />
            <main>
                <h1>QUERIES ARE REPORTING FOR DUTY!</h1>
            </main>
            <Footer />
        </div>
    );
};

export default Queries;
