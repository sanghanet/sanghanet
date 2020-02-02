import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Queries = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Queries" />
            <Navbar />
            <main>
                <h1>QUERIES ARE REPORTING FOR DUTY!</h1>
                <Footer />
            </main>
        </div>
    );
};

export default Queries;
