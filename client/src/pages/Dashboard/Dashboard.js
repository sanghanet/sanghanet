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
                <Navbar navbarScrollPos={0} navStyle="sidenav" />
                <main className="align" onClick={this.log}>
                    <ComingSoon pageName = "Dashboard" isPlural = {false}/>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Dashboard;
