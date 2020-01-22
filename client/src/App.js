import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import LoginFailed from './pages/LoginFailed';
import Loading from './pages/Loading';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Queries from './pages/Queries';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <PrivateRoute path='/profile' component={Profile} />
                    <PrivateRoute path='/queries' component={Queries}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
