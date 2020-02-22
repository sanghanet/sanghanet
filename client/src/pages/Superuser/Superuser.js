import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Superuser = (props) => {
    return (
        <div>
            <Header activePage="Superuser" />
            <Navbar />
            <main className="align">
                <ComingSoon pageName = "Superuser" isPlural = {false}/>
            </main>
            <Footer />
        </div>
    );
};

export default Superuser;
