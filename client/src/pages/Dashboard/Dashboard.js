import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

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
            <div>
                <Header activePage="Dashboard" />
                <Navbar />
                <main className="align">
                    <ComingSoon pageName = "Dashboard" isPlural = {false}/>
                </main>
                <Footer />
            </div>
        );
    }
}

export default Dashboard;
