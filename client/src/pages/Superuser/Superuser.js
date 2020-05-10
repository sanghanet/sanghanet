import React, { Component } from 'react';

import './Superuser.scss';
import { ReactComponent as Cross } from '../../components/icons/cross.svg';
import { ReactComponent as Plus } from '../../components/icons/plus.svg';
import { ReactComponent as Bin } from '../../components/icons/bin.svg';
import { ReactComponent as SuperuserIcon } from '../../components/icons/superman.svg';
import { ReactComponent as FinanceAdminIcon } from '../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../components/icons/yoga.svg';
import { ReactComponent as GeneralUserIcon } from '../../components/icons/personal.svg';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import SearchBar from '../../components/Search/SearchBar';
import Footer from '../../components/Footer/Footer';
import AddUserPopup from './Popup/AddUserPopup';
import EditUserPopup from './Popup/EditUserPopup';
import { Table, Form, Button } from 'react-bootstrap';

import Client from '../../components/Client';

class Superuser extends Component {
    state = {
        userData: null,
        textFilterValue: '',
        roleFilter: {
            showSuperuser: true,
            showFinanceAdmin: true,
            showEventAdmin: true,
            showYogaAdmin: true
        },
        showAddUserPopup: false,
        showEditUserPopup: false,
        editedUser: null
    }

    async componentDidMount () {
        Client.fetch('/su/listmembers', { method: 'POST' })
            .then((data) => {
                this.setState({ userData: data });
            }).catch((err) => {
                // Give warning to the user or handle error here..
                console.error(err);
            });
    }

    checkFilters = (user) => {
        const { roleFilter, textFilterValue } = this.state;

        // eslint-disable-next-line no-multi-spaces
        const passedEmailFilter =   user.email.toLowerCase().includes(textFilterValue.toLowerCase()) ||
                                    user.label.toLowerCase().includes(textFilterValue.toLowerCase());
        // eslint-disable-next-line no-multi-spaces
        const passedRoleFilter =    (user.isSuperuser && roleFilter.showSuperuser) ||
                                    (user.isFinanceAdmin && roleFilter.showFinanceAdmin) ||
                                    (user.isEventAdmin && roleFilter.showEventAdmin) ||
                                    (user.isYogaAdmin && roleFilter.showYogaAdmin) ||
                                    (
                                        !(user.isSuperuser && user.isFinanceAdmin && user.isEventAdmin && user.isYogaAdmin) &&
                                        !(roleFilter.isSuperuser && roleFilter.isFinanceAdmin && roleFilter.isEventAdmin && roleFilter.isYogaAdmin)
                                    );

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
                            <td>{user.label}</td>
                            <td>
                                {
                                    // take out the end of the email addresses
                                    user.email.substring(0, user.email.indexOf('@'))
                                }
                            </td>
                            <td onClick={this.editUser} id={key} className="role-cells">
                                { user.isSuperuser && <SuperuserIcon title='superuser' /> }
                                { user.isFinanceAdmin && <FinanceAdminIcon title='finance admin' /> }
                                { user.isEventAdmin && <EventAdminIcon title='event admin' /> }
                                { user.isYogaAdmin && <YogaAdminIcon title='yoga admin' /> }
                                { !(user.isSuperuser || user.isFinanceAdmin || user.isEventAdmin || user.isYogaAdmin) && <GeneralUserIcon /> }
                            </td>
                            <td className="icon-cell">
                                <Button variant='outline-danger' id={ key }>
                                    <Bin className='delete-user' />
                                </Button>
                            </td>
                        </tr>
                    ) : (null)
                ))
            ) : (null)
        );
    }

    handleEmailFilterChange = (inputValue) => {
        this.setState({ textFilterValue: inputValue });
    }

    handleIconClick = (event) => {
        event.preventDefault();
        this.setState({ textFilterValue: '' });
    }

    handleRoleChange = (event) => {
        // switch (event.target.options.selectedIndex) {
        //     case 0:
        //         this.setState({ roleFilter: 'all' });
        //         break;
        //     case 1:
        //         this.setState({ roleFilter: 'general' });
        //         break;
        //     case 2:
        //         this.setState({ roleFilter: 'super' });
        //         break;
        //     default:
        //         break;
        // }
        console.dir(event);
    }

    resetFilters = () => {
        this.setState({
            textFilterValue: '',
            roleFilter: 'all'
        });

        document.getElementById('roleSelect').selectedIndex = 0;
    }

    addUser = () => {
        this.setState({ showAddUserPopup: true });
    }

    editUser = (event) => {
        const user = this.state.userData[event.currentTarget.id];

        this.setState({
            showEditUserPopup: true,
            editedUser: user
        });
    }

    handlePopupClose = () => {
        this.setState({
            showAddUserPopup: false,
            showEditUserPopup: false
        });
    }

    render () {
        const { textFilterValue, showAddUserPopup, showEditUserPopup, editedUser, roleFilter } = this.state;

        return (
            <div>
                {showAddUserPopup
                    ? (
                        <AddUserPopup
                            modalShow={showAddUserPopup}
                            modalClose={this.handlePopupClose}
                            user={editedUser}
                        />
                    ) : null }
                {showEditUserPopup
                    ? (
                        <EditUserPopup
                            modalShow={showEditUserPopup}
                            modalClose={this.handlePopupClose}
                            user={editedUser}
                        />
                    ) : null }

                <Header activePage="Superuser" />
                <Navbar navStyle="sidenav" />
                <main>
                    {/* --- Form for filters --- */}
                    <Form className="filter-box">
                        <Form.Group>
                            <SearchBar
                                handleInputChange={this.handleEmailFilterChange}
                                handleIconClick={this.handleIconClick}
                                inputValue={textFilterValue}
                                icon={<Cross />}
                            />
                            <Form.Text>Filter by name or email address</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Check checked={roleFilter.showSuperuser} onChange={this.handleRoleChange} id='superuser' type='checkbox' label='superuser' />
                            <Form.Check checked={roleFilter.showFinanceAdmin} onChange={this.handleRoleChange} id='finance' type='checkbox' label='finance admin' />
                            <Form.Check checked={roleFilter.showEventAdmin} onChange={this.handleRoleChange} id='event' type='checkbox' label='event admin' />
                            <Form.Check checked={roleFilter.showYogaAdmin} onChange={this.handleRoleChange} id='yoga' type='checkbox' label='yoga admin' />
                        </Form.Group>
                        <Button variant="outline-primary" onClick={this.resetFilters}>Reset filters</Button>
                    </Form>

                    {/* --- Table --- */}
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="icon-column"></th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <Button className="add-user-btn" variant="success" onClick={this.addUser}>
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
