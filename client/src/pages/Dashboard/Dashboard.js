import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

class Dashboard extends Component {
    render () {
        return (
            <div>
                <Header activePage="Dashboard" />
                <Navbar navStyle="sidenav" />
                <main className="align">
                    <ComingSoon pageName = "Dashboard" isPlural = {false} />
                </main>
                <Footer />
            </div>
        );
    }
}

export default Dashboard;
