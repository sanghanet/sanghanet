import React from 'react';
import './Dashboard.scss';
import SearchBar from './SearchBar';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: null
        };
    }

    render () {
        return (
            <main>
                <h1>DASHBOARD, OF COURSE.</h1>
                {/* <input type="text" name="searchUsers" className="user-search"/> */}
                <SearchBar className="user-search" buttonValue="Search" />
            </main>
        );
    }
}

export default Dashboard;
