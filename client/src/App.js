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
        this.setState({ login: true });
    }

    render () {
        if (!this.state.login) {
            return (<Login onclick={this.logIn}/>);
        }
        return (<Home />);
    }
};

export default App;
