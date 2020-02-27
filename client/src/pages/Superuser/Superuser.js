import React, { Component } from 'react';

import './Superuser.scss';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import { Table } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null,
        emailSearchValue: ''
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

    handleEmailSearch = () => {
        console.log('search handled');
    }

    handleEmailSearchChange = (inputValue) => {
        this.setState({ emailSearchValue: inputValue });
    }

    render () {
        const { userData } = this.state;

        return (
            <div>
                <Header activePage="Superuser" />
                <Navbar />
                <main>
                    <SearchBar
                        handleSearch={this.handleEmailSearch}
                        handleInputChange={this.handleEmailSearchChange}
                        inputValue={this.state.emailSearchValue}
                    />
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
                                // map through userData only if it's been defined
                                userData ? (
                                    userData.map((user, key) => (
                                        user.email.includes(this.state.emailSearchValue) ? (
                                            <tr key={ key }>
                                                {/* show full email address on hover when it's shortened */}
                                                <td title={user.email.length > 30 ? user.email : null}>
                                                    {
                                                        // if email address is too long, shorten it.
                                                        user.email.length > 30 && window.innerWidth < 600 ? (
                                                            `${user.email.substring(0, 25)}...`
                                                        ) : (user.email)
                                                    }
                                                </td>
                                                <td>
                                                    {user.isActive ? 'active' : 'inactive'}
                                                </td>
                                                <td>
                                                    {user.isSuperuser ? 'superuser' : 'general user'}
                                                </td>
                                            </tr>
                                        ) : (null)
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
