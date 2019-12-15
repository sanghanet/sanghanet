import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Queries from '../components/Queries';

const Main = (props) => {
    return (
        <BrowserRouter>
            <Header signOut={props.signOut}/>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/profile' component={Profile} />
                <Route path='/queries' component={Queries} />
            </Switch>
        </BrowserRouter>
    );
};

Main.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Main;
