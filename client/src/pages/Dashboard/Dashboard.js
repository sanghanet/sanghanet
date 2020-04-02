import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: null
        };
    }

    log = () => {
        console.log(this.props.navbarScrollPos);
    }

    printUserList = (userArray) => {
        const result = userArray.map((value, index) => {
            return (
                <div key={value._id}>
                    {index} {value.firstName} {value.lastName}
                </div>
            );
        });

        this.setState({ list: result });
    }

    render () {
        return (
            <div>
                <Header activePage="Dashboard" />
                <Navbar
                    navbarScrollPosUpdate={this.props.navbarScrollPosUpdate}
                    navbarScrollPos={this.props.navbarScrollPos}
                    navStyle="sidenav"
                />
                <main className="align" onClick={this.log}>
                    <ComingSoon pageName = "Dashboard" isPlural = {false}/>
                </main>
                <Footer />
            </div>
        );
    }
}

Dashboard.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default Dashboard;
