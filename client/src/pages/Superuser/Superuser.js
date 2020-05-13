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
import BasicDialog from '../../components/Form/Dialog/BasicDialog';
import { Table, Form, Button, Accordion, Card } from 'react-bootstrap';

import Client from '../../components/Client';

class Superuser extends Component {
    constructor (props) {
        super(props);

        this.state = {
            userData: null,
            textFilterValue: '',
            roleFilter: {
                filterSuperuser: false,
                filterFinanceAdmin: false,
                filterEventAdmin: false,
                filterYogaAdmin: false,
                filterNoRole: false
            },
            showAddUserPopup: false,
            showEditUserPopup: false,
            editedUser: null,
            showDeleteDialog: false
        };
    }

    async componentDidMount () {
        Client.fetch('/su/listmembers', { method: 'POST' })
            .then((data) => {
                this.setState({ userData: data });
            }).catch((err) => {
                // TODO: Give warning to the user or handle error here.
                console.error(err);
            });
    }

    checkFilters = (user) => {
        const { roleFilter, textFilterValue } = this.state;

        // eslint-disable-next-line no-multi-spaces
        const passedEmailFilter =   user.email.toLowerCase().includes(textFilterValue.toLowerCase()) ||
                                    user.label.toLowerCase().includes(textFilterValue.toLowerCase());
        // eslint-disable-next-line no-multi-spaces
        const passedRoleFilter =    !(roleFilter.filterSuperuser || roleFilter.filterFinanceAdmin || roleFilter.filterEventAdmin || roleFilter.filterYogaAdmin || roleFilter.filterNoRole) ||
                                    (user.isSuperuser && roleFilter.filterSuperuser) ||
                                    (user.isFinanceAdmin && roleFilter.filterFinanceAdmin) ||
                                    (user.isEventAdmin && roleFilter.filterEventAdmin) ||
                                    (user.isYogaAdmin && roleFilter.filterYogaAdmin) ||
                                    (
                                        !(user.isSuperuser || user.isFinanceAdmin || user.isEventAdmin || user.isYogaAdmin) &&
                                        roleFilter.filterNoRole
                                    );

        return passedEmailFilter && passedRoleFilter;
    }

    handleDelete = (event) => {
        const user = this.state.userData[event.currentTarget.id];
        this.setState({ showDeleteDialog: true, editedUser: user.email });
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
                                { !(user.isSuperuser || user.isFinanceAdmin || user.isEventAdmin || user.isYogaAdmin) && <GeneralUserIcon title='no role' /> }
                            </td>
                            <td className="delete-icon-cell">
                                <Button variant='outline-danger' id={ key } onClick={this.handleDelete}>
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
        const tempRoleState = Object.assign({}, this.state.roleFilter);
        tempRoleState[event.target.id] = !tempRoleState[event.target.id];
        this.setState({ roleFilter: tempRoleState });
    }

    resetFilters = () => {
        this.setState({
            textFilterValue: '',
            roleFilter: {
                filterSuperuser: false,
                filterFinanceAdmin: false,
                filterEventAdmin: false,
                filterYogaAdmin: false,
                filterNoRole: false
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
            roleFilter,
            showDeleteDialog
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
                { showDeleteDialog
                    ? <BasicDialog
                        title = 'Delete member'
                        message = 'Are you sure you want to delete '
                        memberToBeDeleted = {this.deleteName}
                        user={editedUser}
                        reject = 'No'
                        accept = 'Delete'
                    /> : null
                }
                <Header activePage="Superuser" />
                <Navbar navStyle="sidenav" />
                <main>
                    {/* --- Form for filters --- */}
                    <Accordion className="su-filter-accordion">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                                    Filter members
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
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
                                                id="filterSuperuser"
                                                value="superuser"
                                                checked={roleFilter.filterSuperuser}
                                                handleChange={this.handleRoleChange}
                                            />
                                            <Checkbox
                                                id="filterFinanceAdmin"
                                                value="finance admin"
                                                checked={roleFilter.filterFinanceAdmin}
                                                handleChange={this.handleRoleChange}
                                            />
                                            <Checkbox
                                                id="filterEventAdmin"
                                                value="event admin"
                                                checked={roleFilter.filterEventAdmin}
                                                handleChange={this.handleRoleChange}
                                            />
                                            <Checkbox
                                                id="filterYogaAdmin"
                                                value="yoga admin"
                                                checked={roleFilter.filterYogaAdmin}
                                                handleChange={this.handleRoleChange}
                                            />
                                            <Checkbox
                                                id="filterNoRole"
                                                value="no role"
                                                checked={roleFilter.filterNoRole}
                                                handleChange={this.handleRoleChange}
                                            />
                                        </Form.Group>
                                        <Button className="reset-button" variant="outline-primary" onClick={this.resetFilters}>Reset filters</Button>
                                    </Form>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                    {/* --- Table --- */}
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="role-icon-column">Role</th>
                                <th className="delete-icon-column"></th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <Button className="add-member-btn" variant="success" onClick={this.addUser}>
                                        <Plus />
                                        Add member
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
