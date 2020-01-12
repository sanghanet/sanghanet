import React from 'react';

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
            </main>
        );
    }
}

export default Dashboard;
