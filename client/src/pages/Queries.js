import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Queries = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Queries" signOut={props.signOut}/>
            <Navbar signOut={props.signOut} />
            <main>
                <h1>QUERIES ARE REPORTING FOR DUTY!</h1>
            </main>
        </div>
    );
};

Queries.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Queries;
