import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import LoginFailed from './pages/LoginFailed/LoginFailed';
import Loading from './pages/Loading/Loading';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { HamburgerContext } from './components/contexts/Hamburger/HamburgerContext';

class App extends Component {
    constructor (props) {
        super(props);

        this.toggleHamburger = () => { this.setState((prevState) => ({ isHamburgerOpen: !prevState.isHamburgerOpen })); };
        this.closeHamburger = () => {
            this.state.isHamburgerOpen && this.setState({ isHamburgerOpen: false });
        };

        this.state = {
            isHamburgerOpen: false,
            toggleHamburger: this.toggleHamburger,
            closeHamburger: this.closeHamburger
        };
    }

    render () {
        return (
            <div onClick={ this.closeHamburger }>
                <HamburgerContext.Provider value={this.state}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path='/loading' component={Loading} />
                            <Route path='/loginfailed' component={LoginFailed} />
                            <Route exact path='/404' component={PageNotFound} />
                            <PrivateRoute path='/registration' component={Registration} />
                            <PrivateRoute path='/app/' component={Main} />
                            <Redirect to='/404' />
                        </Switch>
                    </BrowserRouter>
                </HamburgerContext.Provider>
            </div>
        );
    }
};

export default App;
