// #region white
/* ------------ Imports ------------ */
import React, { Component } from 'react';
import Client from '../../../components/Client';

import './Superuser.scss';
import { ReactComponent as Plus } from '../../../components/icons/plus.svg';
import { ReactComponent as Bin } from '../../../components/icons/bin.svg';
import { ReactComponent as SuperuserIcon } from '../../../components/icons/superman.svg';
import { ReactComponent as FinanceAdminIcon } from '../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../components/icons/yoga.svg';
import { ReactComponent as GeneralUserIcon } from '../../../components/icons/personal.svg';
import { ReactComponent as VerifiedIcon } from '../../../components/icons/verified.svg';

import Alert from '../../../components/Alert/Alert';
import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import FilterAccordion from './FilterAccordion/FilterAccordion';
import UpdateMemberRoleDialog from './UpdateMemberRoleDialog/UpdateMemberRoleDialog';
import DeleteMemberDialog from './DeleteMemberDialog/DeleteMemberDialog';
import AddMemberDialog from './AddMemberDialog/AddMemberDialog';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// #endregion

class Superuser extends Component {
    constructor (props) {
        super(props);

        this.state = {
            memberData: null,
            textFilterValue: '',
            registeredFilterValue: 'all',
            roleFilter: {
                filterSuperuser: false,
                filterFinanceAdmin: false,
                filterEventAdmin: false,
                filterYogaAdmin: false,
                filterNoRole: false
            },
            showAddMemberDialog: false,
            showDeleteMemberDialog: false,
            showUpdateAdminDialog: false,
            showAlert: false,
            alertMessage: '',
            alertType: '',
            memberRoles: {}
        };
    }

    // #region yellow
    /* ------------ General functions ------------ */
    componentDidMount () {
        Client.fetch('/su/listmembers', { method: 'POST' })
            .then((data) => {
                this.setState({ memberData: data });
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    }

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    }
    // #endregion

    // #region red
    /* ------------ FilterAccordion functions ------------ */
    handleEmailFilterChange = (inputValue) => {
        this.setState({ textFilterValue: inputValue });
    }

    handleSearchIconClick = (event) => {
        event.preventDefault();
        this.setState({ textFilterValue: '' });
    }

    handleRegisteredFilterChange = (event) => {
        this.setState({ registeredFilterValue: event.target[event.target.selectedIndex].text });
    }

    handleRoleChange = (event) => {
        const tempRoleState = { ...this.state.roleFilter };
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
            },
            registeredFilterValue: 'all'
        });
    }
    // #endregion

    // #region lightgreen
    /* ------------ Dialog functions ------------ */
    // *** OPEN / CLOSE *** //
    openDelete = (event) => {
        const member = this.state.memberData[event.currentTarget.id];
        this.setState({ showDeleteMemberDialog: true, editedMember: member.email });
    }

    openAddMember = () => {
        this.setState({ showAddMemberDialog: true });
    }

    openUpdateMemberRoleDialog = (event) => {
        const member = this.state.memberData[event.currentTarget.id];
        this.setState({
            showUpdateAdminDialog: true,
            editedMember: member.email,
            memberRoles: {
                isFinanceAdmin: member.isFinanceAdmin,
                isEventAdmin: member.isEventAdmin,
                isYogaAdmin: member.isYogaAdmin,
                isSuperuser: member.isSuperuser
            }
        });
    }

    handleCloseDialog = () => {
        this.setState({
            showDeleteMemberDialog: false,
            showAddMemberDialog: false,
            showUpdateAdminDialog: false
        });
    }

    // *** FETCH *** //
    handleDeleteMember = (event) => {
        Client.fetch('/su/deletemember', {
            method: 'DELETE',
            body: `{"remove": "${this.state.editedMember}"}`
        })
            .then((data) => {
                if (data.deleted) {
                    this.setState({
                        memberData: this.state.memberData.filter((member) => member.email !== data.deleted),
                        showAlert: true,
                        alertMessage: `${data.deleted} deleted`,
                        alertType: 'Info'
                    });
                } else {
                    this.setState({ showAlert: true, alertMessage: 'Delete failed. Refresh the page or try it later.', alertType: 'Error' });
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });

        this.setState({ showDeleteMemberDialog: false });
    }

    handleAddMember = (emailAddress, label) => {
        Client.fetch('/su/addmember', {
            method: 'POST',
            body: `{"email": "${emailAddress}", "label": "${label}"}`
        })
            .then((data) => {
                if (data.memberAdded) {
                    this.setState({
                        memberData: [data.memberAdded, ...this.state.memberData],
                        showAlert: true,
                        alertMessage: `${data.memberAdded.email} added`,
                        alertType: 'Info'
                    });
                } else {
                    if (data.exists) {
                        this.setState({ showAlert: true, alertMessage: `${emailAddress} is already added.`, alertType: 'Warning' });
                    } else {
                        this.setState({ showAlert: true, alertMessage: `Couldn't add ${emailAddress}`, alertType: 'Error' });
                    }
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });

        this.setState({ showAddMemberDialog: false });
    }

    handleUpdateMemberRoleDialog = (roles) => {
        const { editedMember } = this.state;

        Client.fetch('/su/updatemember', {
            method: 'PUT',
            body: `{
                "update": "${editedMember}",
                "isFinanceAdmin": "${roles.isFinanceAdmin}",
                "isEventAdmin": "${roles.isEventAdmin}",
                "isYogaAdmin": "${roles.isYogaAdmin}",
                "isSuperuser": "${roles.isSuperuser}"
            }`
        })
            .then((data) => {
                if (data.updated) {
                    // deep copy with data update
                    const newMembers = this.state.memberData.map((member) => member.email === data.updated
                        ? {
                            ...member,
                            isEventAdmin: data.isEvent,
                            isFinanceAdmin: data.isFinance,
                            isYogaAdmin: data.isYoga,
                            isSuperuser: data.isSuperuser
                        }
                        : member
                    );
                    this.setState({
                        memberData: newMembers,
                        showAlert: true,
                        alertMessage: `${data.updated} role updated`,
                        alertType: 'Info'
                    });
                } else {
                    this.setState({ showAlert: true, alertMessage: 'Update failed. Refresh the page or try it later.', alertType: 'Error' });
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });

        this.setState({ showUpdateAdminDialog: false });
    }
    // #endregion

    // #region blue
    /* ------------ User rows ------------ */
    // *** CHECK FILTERS *** //
    checkFilters = (user) => {
        const { roleFilter, textFilterValue, registeredFilterValue } = this.state;

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

        // eslint-disable-next-line no-multi-spaces
        const passedRegisteredFilter =  (registeredFilterValue === 'all') ||
                                        (user.registered && registeredFilterValue !== 'unregistered') ||
                                        (!user.registered && registeredFilterValue !== 'registered');

        return passedEmailFilter && passedRoleFilter && passedRegisteredFilter;
    }

    // *** RENDER ROWS *** //
    renderMembers = () => {
        const { memberData } = this.state;

        return (
            memberData.map((user, key) => (
                // check if user passes all filters
                (this.checkFilters(user)) ? (
                    <tr key={ key }>
                        <td className="name-cells">
                            <span>{user.label}</span>
                            {user.registered && <VerifiedIcon />}
                        </td>
                        <td>
                            {
                                // take out the end of the email addresses
                                user.email.substring(0, user.email.indexOf('@'))
                            }
                        </td>
                        <td className="role-cells">
                            <Button id={key} onClick={this.openUpdateMemberRoleDialog}>
                                { user.isSuperuser && <SuperuserIcon title='superuser' /> }
                                { user.isFinanceAdmin && <FinanceAdminIcon title='finance admin' /> }
                                { user.isEventAdmin && <EventAdminIcon title='event admin' /> }
                                { user.isYogaAdmin && <YogaAdminIcon title='yoga admin' /> }
                                { !(user.isSuperuser || user.isFinanceAdmin || user.isEventAdmin || user.isYogaAdmin) && <GeneralUserIcon title='no role' /> }
                            </Button>
                        </td>
                        <td className="delete-icon-cell">
                            <Button variant='outline-danger' id={ key } onClick={this.openDelete}>
                                <Bin className='delete-user' />
                            </Button>
                        </td>
                    </tr>
                ) : (null)
            ))
        );
    }
    // #endregion

    // #region yellow
    render () {
        const {
            memberData,
            textFilterValue,
            registeredFilterValue,
            showAddMemberDialog,
            showUpdateAdminDialog,
            editedMember,
            roleFilter,
            showDeleteMemberDialog,
            showAlert,
            alertMessage,
            alertType,
            memberRoles
        } = this.state;

        return (
            <div>
                {showAddMemberDialog &&
                    <AddMemberDialog
                        closeDialog = {this.handleCloseDialog}
                        addMember = {this.handleAddMember}
                    />
                }
                { showUpdateAdminDialog &&
                    <UpdateMemberRoleDialog
                        memberEmail = {editedMember}
                        memberRoles = {memberRoles}
                        updateRole = {this.handleUpdateMemberRoleDialog}
                        closeDialog = {this.handleCloseDialog}
                    />
                }
                { showDeleteMemberDialog &&
                    <DeleteMemberDialog
                        member={editedMember}
                        deleteMember = {this.handleDeleteMember}
                        closeDialog = {this.handleCloseDialog}
                    />
                }
                <Header activePage="Superuser" />
                <Navbar navStyle="sidenav" />
                <main>
                    { showAlert &&
                        <Alert
                            alertMsg={alertMessage}
                            alertType={alertType}
                            alertClose={this.closeAlert} />
                    }
                    <FilterAccordion
                        handleEmailFilterChange={this.handleEmailFilterChange}
                        handleSearchIconClick={this.handleSearchIconClick}
                        handleRegisteredFilterChange={this.handleRegisteredFilterChange}
                        handleRoleChange={this.handleRoleChange}
                        resetFilters={this.resetFilters}
                        textFilterValue={textFilterValue}
                        registeredFilterValue={registeredFilterValue}
                        roleFilter={roleFilter}
                    />

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
                                    <Button className="add-member-btn" variant="success" onClick={this.openAddMember}>
                                        <Plus />
                                        Add member
                                    </Button>
                                </td>
                            </tr>
                            {memberData && this.renderMembers()}
                        </tbody>
                    </Table>
                </main>
                <Footer />
            </div>
        );
    }
    // #endregion
};

export default Superuser;
