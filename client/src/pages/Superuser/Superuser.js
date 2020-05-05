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
import Checkbox from '../../components/Form/Checkbox/Checkbox';
import { Table, Form, Button } from 'react-bootstrap';

import Client from '../../components/Client';

class Superuser extends Component {
    constructor (props) {
        super(props);

        this.state = {
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
        };
    }

    async componentDidMount () {
        // TODO: change /user/listusers to /superuser/listusers
        Client.fetch('/user/listusers', { method: 'POST' })
            .then((data) => {
                this.setState({ userData: data });
            }).catch((err) => {
                // Give warning to the user or handle error here..
                console.error(err);
            });
    }

    checkFilters = (user) => {
        const { roleFilter, textFilterValue } = this.state;
        const fullName = `${user.firstName} ${user.lastName}`;

        // eslint-disable-next-line no-multi-spaces
        const passedEmailFilter =   user.email.toLowerCase().includes(textFilterValue.toLowerCase()) ||
                                    fullName.toLowerCase().includes(textFilterValue.toLowerCase());
        // eslint-disable-next-line no-multi-spaces
        const passedRoleFilter =    (user.isSuperuser && roleFilter.showSuperuser) ||
                                    (user.isFinanceAdmin && roleFilter.showFinanceAdmin) ||
                                    (user.isEventAdmin && roleFilter.showEventAdmin) ||
                                    (user.isYogaAdmin && roleFilter.showYogaAdmin) ||
                                    // show every kind of user if all filters are set to true
                                    (roleFilter.showSuperuser && roleFilter.showFinanceAdmin && roleFilter.showEventAdmin && roleFilter.showYogaAdmin) ||
                                    // show general users only if all special role filters are set to false
                                    (
                                        !(user.isSuperuser || user.isFinanceAdmin || user.isEventAdmin || user.isYogaAdmin) &&
                                        !(roleFilter.showSuperuser || roleFilter.showFinanceAdmin || roleFilter.showEventAdmin || roleFilter.showYogaAdmin)
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
                            <td>{`${user.firstName} ${user.lastName}`}</td>
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
        // TODO solve this with using the '...' syntax
        const tempRoleState = Object.assign({}, this.state.roleFilter);
        tempRoleState[event.target.id] = !tempRoleState[event.target.id];
        this.setState({ roleFilter: tempRoleState });
    }

    resetFilters = () => {
        this.setState({
            textFilterValue: '',
            roleFilter: {
                showSuperuser: true,
                showFinanceAdmin: true,
                showEventAdmin: true,
                showYogaAdmin: true
            }
        });
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
        const {
            textFilterValue,
            showAddUserPopup,
            showEditUserPopup,
            editedUser,
            roleFilter
        } = this.state;

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
                        <Form.Group className="search-bar">
                            <SearchBar
                                handleInputChange={this.handleEmailFilterChange}
                                handleIconClick={this.handleIconClick}
                                inputValue={textFilterValue}
                                icon={<Cross />}
                            />
                            <Form.Text>Filter by name or email address</Form.Text>
                        </Form.Group>
                        <Form.Group className="role-filter">
                            <Checkbox
                                id="showSuperuser"
                                value="superuser"
                                checked={roleFilter.showSuperuser}
                                handleChange={this.handleRoleChange}
                            />
                            <Checkbox
                                id="showFinanceAdmin"
                                value="finance admin"
                                checked={roleFilter.showFinanceAdmin}
                                handleChange={this.handleRoleChange}
                            />
                            <Checkbox
                                id="showEventAdmin"
                                value="event admin"
                                checked={roleFilter.showEventAdmin}
                                handleChange={this.handleRoleChange}
                            />
                            <Checkbox
                                id="showYogaAdmin"
                                value="yoga admin"
                                checked={roleFilter.showYogaAdmin}
                                handleChange={this.handleRoleChange}
                            />
                        </Form.Group>
                        <Button className="reset-button" variant="outline-primary" onClick={this.resetFilters}>Reset filters</Button>
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
