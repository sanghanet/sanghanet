import React, { Component } from 'react';

import './Superuser.scss';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Table } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null
    }

    componentDidMount () {
        fetch('http://localhost:4000/userList')
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ userData: data });
                console.dir(this.state.userData);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    render () {
        const { userData } = this.state;

        return (
            <div>
                <Header activePage="Superuser" />
                <Navbar />
                <main>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData ? (
                                    userData.map((user, key) => (
                                        <tr key={ key }>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.isActive ? 'active' : 'inactive'}
                                            </td>
                                            <td>
                                                {user.isSuperuser ? 'superuser' : 'general user'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (null)
                            }
                        </tbody>
                    </Table>
                </main>
                <Footer />
            </div>
        );
    }
};

export default Superuser;
