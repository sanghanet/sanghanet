import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Queries = (props) => {
    return (
        <div>
            <Header activePage="Queries" />
            <Navbar
                navbarScrollPosUpdate={props.navbarScrollPosUpdate}
                navbarScrollPos={props.navbarScrollPos}
                navStyle="sidenav"
            />
            <main className="align">
                <ComingSoon pageName = "Queries" isPlural = {true}/>
            </main>
            <Footer />
        </div>
    );
};

Queries.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Queries;
