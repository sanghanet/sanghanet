import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Queries = (props) => {
    return (
        <div>
            <Header activePage="Queries" />
            <Navbar navbarScrollPos={300} navStyle="sidenav" />
            <main className="align">
                <ComingSoon pageName = "Queries" isPlural = {true}/>
            </main>
            <Footer />
        </div>
    );
};

export default Queries;
