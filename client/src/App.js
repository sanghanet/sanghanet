import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Queries from './pages/Queries';
import Finances from './pages/Finances';

class App extends Component {
    onSignOut = () => {
        console.log('You are logged out');
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/dashboard'
                        render={ (props) => (
                            <Dashboard {...props} signOut={this.onSignOut} />
                        )}
                    />
                    <Route path='/profile'
                        render={ (props) => (
                            <Profile {...props} signOut={this.onSignOut} />
                        )}
                    />
                    <Route path='/queries'
                        render={ (props) => (
                            <Queries {...props} signOut={this.onSignOut} />
                        )}
                    />
                    <Route path='/finances'
                        render={ (props) => (
                            <Finances {...props} signOut={this.onSignOut} />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
