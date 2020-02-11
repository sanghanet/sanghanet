import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ComingSoon from '../components/ComingSoon';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: null
        };
    }

    render () {
        return (
            <div>
                <Header activePage="Dashboard" />
                <Navbar />
                <main className="align">
                    <ComingSoon pageName = "Dashboard" isPlural = {false}/>
                </main>
            </div>
        );
    }
}

export default Dashboard;
