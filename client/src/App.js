import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import ThrowOut from './pages/TrowOut/ThrowOut';
import Loading from './pages/Loading/Loading';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { DataContext } from './components/contexts/DataContext/DataContext';
import { UIcontext } from './components/contexts/UIcontext/UIcontext';
import { dictionaryList } from './languages/dictionaryList';

class App extends Component {
    constructor (props) {
        super(props);

        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'hu');
        }

        this.state = {
            uiContext: {
                isHamburgerOpen: false,
                toggleHamburger: this.toggleHamburger,
                closeHamburger: this.closeHamburger,

                isSuperuser: false,
                isFinanceAdmin: false,
                isEventAdmin: false,
                isYogaAdmin: false,
                setAccess: this.setAccess,

                lang: 'hu',
                dictionary: dictionaryList[localStorage.getItem('lang')],
                changeLang: this.changeLang
            },

            dataContext: {
                userName: 'unknown',
                avatarSrc: '/images/noAvatar.svg',
                setUsername: this.setUsername,
                setAvatarSrc: this.setAvatarSrc
            }
        };
    }

    toggleHamburger = () => {
        const uiContext = { ...this.state.uiContext };
        uiContext.isHamburgerOpen = !this.state.uiContext.isHamburgerOpen;
        this.setState({ uiContext });
    };

    closeHamburger = () => {
        const uiContext = { ...this.state.uiContext };
        uiContext.isHamburgerOpen = false;
        this.state.uiContext.isHamburgerOpen && this.setState({ uiContext });
    };

    setAccess = (isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin) => {
        const uiContext = { ...this.state.uiContext };
        uiContext.isSuperuser = isSuperuser;
        uiContext.isFinanceAdmin = isFinanceAdmin;
        uiContext.isEventAdmin = isEventAdmin;
        uiContext.isYogaAdmin = isYogaAdmin;
        this.setState({ uiContext });
    };

    changeLang = (lang) => {
        const uiContext = { ...this.state.uiContext };
        uiContext.lang = lang;
        uiContext.dictionary = dictionaryList[lang];
        this.setState({ uiContext });
    };

    setUsername = ( firstName, lastName) => {
        const dataContext = { ...this.state.dataContext };
        dataContext.userName = `${firstName} ${lastName}`;
        this.setState({ dataContext });
    }

    setAvatarSrc = (src) => {
        const dataContext = { ...this.state.dataContext };
        dataContext.avatarSrc = src;
        this.setState({ dataContext });
    }

    render () {
        return (
            <div onClick={ this.closeHamburger }>
                <UIcontext.Provider value={this.state.uiContext}>
                    <DataContext.Provider value={this.state.dataContext}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/' component={Login} />
                                <Route path='/loading' component={Loading} />
                                <Route path='/throwout/:reason' component={ThrowOut} />
                                <Route exact path='/404' component={PageNotFound} />
                                <PrivateRoute path='/registration' component={Registration} />
                                <PrivateRoute path='/app/' component={Main} history={createBrowserHistory()} />
                                <Redirect to='/404' />
                            </Switch>
                        </BrowserRouter>
                    </DataContext.Provider>
                </UIcontext.Provider>
            </div>
        );
    }
};

export default App;
