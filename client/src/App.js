import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import LoginFailed from './pages/LoginFailed/LoginFailed';
import Loading from './pages/Loading/Loading';
import Dashboard from './pages/Dashboard/Dashboard';
import Personal from './pages/Personal/Personal';
import Yoga from './pages/Yoga/Yoga';
import Finances from './pages/Finances/Finances';
import Events from './pages/Events/Events';
import Questions from './pages/Questions/Questions';
import Queries from './pages/Queries/Queries';
import Superuser from './pages/Superuser/Superuser';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <PrivateRoute path='/personal' component={Personal}/>
                    <PrivateRoute path='/yoga' component={Yoga}/>
                    <PrivateRoute path='/finances' component={Finances}/>
                    <PrivateRoute path='/events' component={Events}/>
                    <PrivateRoute path='/questions' component={Questions}/>
                    <PrivateRoute path='/queries' component={Queries}/>
                    <PrivateRoute path='/superuser' component={Superuser}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
