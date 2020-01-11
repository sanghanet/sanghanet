import React, { Component } from 'react';

import './App.css';
import Main from './pages/Main';

class App extends Component {
    // there was a warning in the console saying that this is useless:
    // constructor (props) {
    //     super(props);
    // }

    onSignOut = () => {
        console.log('You are logged out');
        this.setState({ login: false });
    }

    render () {
        return (<Main signOut={this.onSignOut} />);
    }
};

export default App;
