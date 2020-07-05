import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import LoginFailed from './pages/LoginFailed/LoginFailed';
import Loading from './pages/Loading/Loading';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { UIcontext } from './components/contexts/UIcontext/UIcontext';
import { dictionaryList } from './languages/dictionaryList';

class App extends Component {
    constructor (props) {
        super(props);

        this.toggleHamburger = () => { this.setState((prevState) => ({ isHamburgerOpen: !prevState.isHamburgerOpen })); };
        this.closeHamburger = () => {
            this.state.isHamburgerOpen && this.setState({ isHamburgerOpen: false });
        };

        this.setAccess = (isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin) => {
            this.setState({
                isSuperuser,
                isFinanceAdmin,
                isEventAdmin,
                isYogaAdmin
            });
        };

        this.changeLang = (lang) => {
            this.setState({
                lang,
                dictionary: dictionaryList[lang]
            });
        };

        this.state = {
            isHamburgerOpen: false,
            toggleHamburger: this.toggleHamburger,
            closeHamburger: this.closeHamburger,

            isSuperuser: false,
            isFinanceAdmin: false,
            isEventAdmin: false,
            isYogaAdmin: false,
            setAccess: this.setAccess,

            lang: 'hu',
            // eslint-disable-next-line dot-notation
            dictionary: dictionaryList['hu'],
            changeLang: this.changeLang
        };
    }

    render () {
        return (
            <div onClick={ this.closeHamburger }>
                <UIcontext.Provider value={this.state}>
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
                </UIcontext.Provider>
            </div>
        );
    }
};

export default App;
