import React, { Component } from 'react';

import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { login: false };
    }

    logIn = () => {
        console.log('You are logged in');
        this.setState({ login: true });
    }

    onSignOut = () => {
        console.log('You are logged out');
        this.setState({ login: false });
    }

    render () {
        return this.state.login
            ? (<Main signOut={this.onSignOut} />)
            : (<Login loginOK={this.logIn} />);
    }
};

export default App;
