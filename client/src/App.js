import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import LoginFailed from './pages/LoginFailed';
import Loading from './pages/Loading';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Queries from './pages/Queries';

class App extends Component {
    onSignOut = () => {
        console.log('You are logged out');
    }

    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/loading' component={Loading} />
                    <Route path='/loginfailed' component={LoginFailed} />
                    <Route path='/dashboard'
                        render={ props => (
                            <Dashboard {...props} signOut={this.onSignOut} />
                        )}
                    />
                    <Route path='/profile'
                        render={ props => (
                            <Profile {...props} signOut={this.onSignOut} />
                        )}
                    />
                    <Route path='/queries'
                        render={ props => (
                            <Queries {...props} signOut={this.onSignOut} />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;
