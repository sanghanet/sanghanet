import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         navbarScrollPos: 0
    //     };
    // }

    // componentDidMount () {
    //     console.log(this.state.navbarScrollPos);
    // }

    // navbarScrollPosUpdate = (newScrollPos) => {
    //     this.setState({ navbarScrollPos: newScrollPos });
    //     // console.log(newScrollPos);
    // }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <PrivateRoute path='/dashboard' component={Dashboard} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/personal' component={Personal} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/yoga' component={Yoga} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/finances' component={Finances} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/events' component={Events} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/questions' component={Questions} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/queries' component={Queries} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                    <PrivateRoute path='/superuser' component={Superuser} navbarScrollPosUpdate={this.props.navbarScrollPosUpdate} navbarScrollPos={this.props.navbarScrollPos}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

App.propTypes = {
    navbarScrollPos: PropTypes.number,
    navbarScrollPosUpdate: PropTypes.func
};

export default App;
