import React, { Component } from 'react';

import './Superuser.scss';
import { ReactComponent as Cross } from '../../components/icons/cross.svg';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import { Table, Form } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null,
        emailSearchValue: '',
        statusFilter: 'all',
        roleFilter: 'all'
    }

    componentDidMount () {
        fetch('http://localhost:4000/userList')
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ userData: data });
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    renderUsers = () => {
        const { userData, statusFilter, roleFilter, emailSearchValue } = this.state;

        return (
            // map through userData only if it's been defined
            userData ? (
                userData.map((user, key) => (
                    // filter emails
                    user.email.toLowerCase().includes(emailSearchValue.toLowerCase()) ? (
                        // filter status
                        (user.isActive && !(statusFilter === 'inactive')) || (!user.isActive && !(statusFilter === 'active')) ? (
                            // filter role
                            (user.isSuperuser && !(roleFilter === 'general')) || (!user.isSuperuser && !(roleFilter === 'super')) ? (
                                <tr key={ key }>
                                    <td>
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
                        ) : (null)
                    ) : (null)
                ))
            ) : (null)
        );
    }

    handleEmailSearch = () => {
        console.log('search handled');
    }

    handleEmailSearchChange = (inputValue) => {
        this.setState({ emailSearchValue: inputValue });
    }

    handleStatuschange = (e) => {
        switch (e.target.options.selectedIndex) {
            case 0:
                this.setState({ statusFilter: 'all' });
                break;
            case 1:
                this.setState({ statusFilter: 'active' });
                break;
            case 2:
                this.setState({ statusFilter: 'inactive' });
                break;
            default:
                break;
        }
    }

    handleIconClick = (e) => {
        e.preventDefault();
        this.setState({ emailSearchValue: '' });
    }

    handleRolechange = (e) => {
        switch (e.target.options.selectedIndex) {
            case 0:
                this.setState({ roleFilter: 'all' });
                break;
            case 1:
                this.setState({ roleFilter: 'general' });
                break;
            case 2:
                this.setState({ roleFilter: 'super' });
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <div>
                <Header activePage="Superuser" />
                <Navbar />
                <main>
                    <Form className="filter-box">
                        <Form.Group>
                            <SearchBar
                                handleSearch={this.handleEmailSearch}
                                handleInputChange={this.handleEmailSearchChange}
                                handleIconClick={this.handleIconClick}
                                inputValue={this.state.emailSearchValue}
                                icon={<Cross />}
                            />
                            <Form.Text>Search for an email address</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="statusSelect">Status</Form.Label>
                            <select defaultValue={this.state.statusFilter} id="statusSelect" onChange={this.handleStatuschange}>
                                <option>all</option>
                                <option>active</option>
                                <option>inactive</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="roleSelect">Role</Form.Label>
                            <select defaultValue={this.state.roleFilter} id="roleSelect" onChange={this.handleRolechange}>
                                <option>all</option>
                                <option>general user</option>
                                <option>superuser</option>
                            </select>
                        </Form.Group>
                    </Form>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUsers()}
                        </tbody>
                    </Table>
                </main>
                <Footer />
            </div>
        );
    }
};

export default Superuser;
