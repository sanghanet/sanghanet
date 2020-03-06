import React, { Component } from 'react';

import './Superuser.scss';
import { ReactComponent as Cross } from '../../components/icons/cross.svg';
import { ReactComponent as Plus } from '../../components/icons/plus.svg';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import { Table, Form, Button } from 'react-bootstrap';

class Superuser extends Component {
    state = {
        userData: null,
        emailFilterValue: '',
        roleFilter: 'all'
    }

    componentDidMount () {
        fetch('/userlist', { method: 'POST' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ userData: data });
                console.dir(this.state.userData);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    checkFilters = (user) => {
        const { roleFilter, emailFilterValue } = this.state;

        const passedEmailFilter = user.email.toLowerCase().includes(emailFilterValue.toLowerCase());
        const passedRoleFilter = (user.isSuperuser && roleFilter !== 'general') || (!user.isSuperuser && roleFilter !== 'super');

        return passedEmailFilter && passedRoleFilter;
    }

    renderUsers = () => {
        const { userData } = this.state;

        return (
            // map through userData only if it's been defined
            userData ? (
                userData.map((user, key) => (
                    // check if user passes all filters
                    (this.checkFilters(user)) ? (
                        <tr key={ key }>
                            <td>{`${user.firstName} ${user.lastName}`}</td>
                            <td>
                                {
                                    // take out the end of the email addresses
                                    user.email.substring(0, user.email.indexOf('@'))
                                }
                            </td>
                            <td>
                                {user.isSuperuser ? 'superuser' : 'general user'}
                            </td>
                        </tr>
                    ) : (null)
                ))
            ) : (null)
        );
    }

    handleEmailFilterChange = (inputValue) => {
        this.setState({ emailFilterValue: inputValue });
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
            roleFilter: 'all'
        });

        document.getElementById('roleSelect').selectedIndex = 0;
    }

    addUser = () => {
        console.log('This function will add a user');
    }

    render () {
        const { emailFilterValue, roleFilter } = this.state;

        return (
            <div>
                <Header activePage="Superuser" />
                <Navbar />
                <main>
                    {/* --- Form for filters --- */}
                    <Form className="filter-box">
                        <Form.Group>
                            <SearchBar
                                handleInputChange={this.handleEmailFilterChange}
                                handleIconClick={this.handleIconClick}
                                inputValue={emailFilterValue}
                                icon={<Cross />}
                            />
                            <Form.Text>Filter by email address</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="roleSelect">Role</Form.Label>
                            <select defaultValue={roleFilter} id="roleSelect" onChange={this.handleRolechange}>
                                <option>all</option>
                                <option>general user</option>
                                <option>superuser</option>
                            </select>
                        </Form.Group>
                        <Button variant="dark" onClick={this.resetFilters}>Reset filters</Button>
                    </Form>

                    {/* --- Table --- */}
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <tr>
                                <td colSpan={3}>
                                    <Button className="add-user-btn" variant="dark" onClick={this.addUser}>
                                        <Plus />
                                        Add user
                                    </Button>
                                </td>
                            </tr>
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
