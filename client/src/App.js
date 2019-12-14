import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

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
        return !this.state.login
            ? (<Login loginOK={this.logIn} />)
            : (<Home signOut={this.onSignOut} />);
    }
};

export default App;
