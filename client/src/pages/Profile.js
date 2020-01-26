import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Profile = (props) => {
    return (
        <div className='grid-container'>
            <Header activePage="Profile" />
            <Navbar />
            <main>
                <h1>THIS IS YOUR PROFILE</h1>
            </main>
        </div>
    );
};

export default Profile;
