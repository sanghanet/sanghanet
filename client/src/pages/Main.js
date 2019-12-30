import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../components/Navbar_Header.scss';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Queries from '../components/Queries';

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = { activePage: 'Dashboard' };
    }

    setActivePage = (param) => {
        this.setState({ activePage: param });
    }

    render () {
        return (
            <BrowserRouter>
                <div className="grid-container">
                    <Header activePage={this.state.activePage} />
                    <Navbar signOut={this.props.signOut} setActivePage={this.setActivePage} />
                    <Switch className="main">
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/profile' component={Profile} />
                        <Route path='/queries' component={Queries} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
};

Main.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Main;
