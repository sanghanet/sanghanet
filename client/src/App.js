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
    constructor (props) {
        super(props);
        this.state = {
            navbarScrollPos: 0
        };
    }

    navbarScrollPosUpdate = (newScrollPos) => {
        this.setState({ navbarScrollPos: newScrollPos });
        console.log(newScrollPos);
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <PrivateRoute path='/dashboard' component={Dashboard} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/personal' component={Personal} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/yoga' component={Yoga} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/finances' component={Finances} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/events' component={Events} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/questions' component={Questions} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/queries' component={Queries} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                    <PrivateRoute path='/superuser' component={Superuser} navbarScrollPosUpdate={this.navbarScrollPosUpdate} navbarScrollPos={this.state.navbarScrollPos}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
