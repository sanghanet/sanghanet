import React, { Component } from 'react';

import './Superuser.scss';
import { ReactComponent as Cross } from '../../components/icons/cross.svg';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import { Table, Form, Button } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null,
        emailFilterValue: '',
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
        const { userData, statusFilter, roleFilter, emailFilterValue } = this.state;

        return (
            // map through userData only if it's been defined
            userData ? (
                userData.map((user, key) => (
                    // filter emails
                    user.email.toLowerCase().includes(emailFilterValue.toLowerCase()) ? (
                        // filter status
                        (user.isActive && statusFilter !== 'inactive') || (!user.isActive && statusFilter !== 'active') ? (
                            // filter role
                            (user.isSuperuser && roleFilter !== 'general') || (!user.isSuperuser && roleFilter !== 'super') ? (
                                <tr key={ key }>
                                    <td>
                                        {
                                            // if email address is too long, shorten it.
                                            user.email.substring(0, user.email.indexOf('@'))
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

    handleEmailFilterChange = (inputValue) => {
        this.setState({ emailFilterValue: inputValue });
    }

    handleStatuschange = (event) => {
        switch (event.target.options.selectedIndex) {
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

    handleIconClick = (event) => {
        event.preventDefault();
        this.setState({ emailFilterValue: '' });
    }

    handleRolechange = (event) => {
        switch (event.target.options.selectedIndex) {
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

    resetFilters = () => {
        this.setState({
            emailFilterValue: '',
            statusFilter: 'all',
            roleFilter: 'all'
        });

        document.getElementById('statusSelect').selectedIndex = 0;
        document.getElementById('roleSelect').selectedIndex = 0;
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
                                handleInputChange={this.handleEmailFilterChange}
                                handleIconClick={this.handleIconClick}
                                inputValue={this.state.emailFilterValue}
                                icon={<Cross />}
                            />
                            <Form.Text>Filter by email address</Form.Text>
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
                        <Button variant="dark" onClick={this.resetFilters}>Reset filters</Button>
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
