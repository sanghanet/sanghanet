import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Profile = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Profile" signOut={props.signOut}/>
            <Navbar signOut={props.signOut} />
            <main>
                <h1>THIS IS YOUR PROFILE</h1>
            </main>
        </div>
    );
};

Profile.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Profile;
