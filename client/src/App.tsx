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
import { UIcontext } from './components/contexts/UIcontext/UIcontext';
import { DataContext } from './components/contexts/DataContext/DataContext';
import { dictionaryList } from './languages/dictionaryList';

interface Props {};

type AppState = {
    uiContext: UiContextType
    dataContext: DataContextType
};

class App extends Component<Props, AppState> {
    constructor (props: Props) {
        super(props);

        if (!localStorage.getItem('lang')) {
            localStorage.setItem('lang', 'hu');
        }
        const _lang = localStorage.getItem('lang') as LANGUAGE;

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

                lang: _lang,
                dictionary: dictionaryList[_lang],
                changeLang: this.changeLang
            },

            dataContext: {
                userName: {
                    firstName: '',
                    lastName: '',
                    fullName: ''
                },
                getFullName: this.getFullName,
                avatarSrc: '/images/noAvatar.svg',
                setUsername: this.setUsername,
                setAvatarSrc: this.setAvatarSrc
            }
        };
    }

    getFullName = (firstName: string, lastName: string) => {
        const { lang } = this.state.uiContext;
        return lang === 'hu' ? `${lastName} ${firstName}` : `${firstName} ${lastName}`;
    }

    toggleHamburger = () => {
        const { uiContext } = this.state;
        uiContext.isHamburgerOpen = !uiContext.isHamburgerOpen;
        this.setState({ uiContext });
    };

    closeHamburger = () => {
        const { uiContext } = this.state;
        uiContext.isHamburgerOpen = false;
        this.state.uiContext.isHamburgerOpen && this.setState({ uiContext });
    };

    setAccess = (isSuperuser: boolean, isFinanceAdmin: boolean, isEventAdmin: boolean, isYogaAdmin: boolean) => {
        const { uiContext } = this.state;
        uiContext.isSuperuser = isSuperuser;
        uiContext.isFinanceAdmin = isFinanceAdmin;
        uiContext.isEventAdmin = isEventAdmin;
        uiContext.isYogaAdmin = isYogaAdmin;
        this.setState({ uiContext });
    };

    changeLang = (lang: LANGUAGE) => {
        const { uiContext } = this.state;
        const { dataContext } = this.state;
        const { firstName, lastName } = dataContext.userName;

        uiContext.lang = lang;
        uiContext.dictionary = dictionaryList[lang];

        dataContext.userName = {
            firstName,
            lastName,
            fullName: this.getFullName(firstName, lastName)
        };

        this.setState({ uiContext, dataContext });
    };

    setUsername = (firstName: string, lastName: string) => {
        const { dataContext } = this.state;

        dataContext.userName = {
            firstName,
            lastName,
            fullName: this.getFullName(firstName, lastName)
        };

        this.setState({ dataContext });
    }

    setAvatarSrc = (src: string) => {
        const { dataContext } = this.state;
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
