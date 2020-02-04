import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: null
        };
    }

    fetchData = () => {
        fetch('http://localhost:4000/userList', { method: 'GET' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.printUserList(data);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    printUserList = (userArray) => {
        const result = userArray.map((value, index) => {
            return (
                <div key={value._id}>
                    {index} {value.firstName} {value.lastName}
                </div>
            );
        });

        this.setState({ list: result });
    }

    render () {
        return (
            <div className='grid-container'>
                <Header activePage="Dashboard" />
                <Navbar />
                <main>
                    <h1>DASHBOARD, OF COURSE.</h1>
                    <input type="text" name="searchUsers" className="user-search"/>
                    <button onClick = {this.fetchData}>List users</button>
                    <div>{this.state.list}</div>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Dashboard;
