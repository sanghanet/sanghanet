/* ------------ Imports ------------ */
import React, { Component } from 'react';
import Client from '../../../components/Client';
import { UIcontext } from '../../../components/contexts/UIcontext/UIcontext';

import './Superuser.scss';
import { ReactComponent as Plus } from '../../../components/icons/plus.svg';
import { ReactComponent as Bin } from '../../../components/icons/bin.svg';
import { ReactComponent as VerifiedIcon } from '../../../components/icons/verified.svg';
import { ReactComponent as SettingsIcon } from '../../../components/icons/settings.svg';

import Alert from '../../../components/Alert/Alert';
import LoadingIndicator from '../../../components/LoadingIndicator/LoadingIndicator';
import FilterAccordion from './FilterAccordion/FilterAccordion';
import UserSettingsDialog from './UserSettingsDialog/UserSettingsDialog';
import DeleteMemberDialog from './DeleteMemberDialog/DeleteMemberDialog';
import AddMemberDialog from './AddMemberDialog/AddMemberDialog';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Superuser extends Component {
    static contextType = UIcontext;

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
            alertParam: '',
            memberRoles: {},
            memberLevel: ''
        };
    }

    /* ------------ General functions ------------ */
    componentDidMount () {
        Client.fetch('/su/getmemberdata', {
            method: 'POST',
            fields: ['email', 'isSuperuser', 'isFinanceAdmin', 'isEventAdmin', 'isYogaAdmin', 'label', 'registered', 'level']
        })
            .then((data) => {
                this.setState({ memberData: data.reverse()});
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
    }

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    }

    /* ------------ FilterAccordion functions ------------ */
    handleEmailFilterChange = (inputValue) => {
        this.setState({ textFilterValue: inputValue });
    }

    handleSearchIconClick = (event) => {
        event.preventDefault();
        this.setState({ textFilterValue: '' });
    }

    handleRegisteredFilterChange = (event) => {
        this.setState({ registeredFilterValue: event.target.value });
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

    /* ------------ Dialog functions ------------ */
    // *** OPEN / CLOSE *** //
    openDelete = (event) => {
        const member = this.state.memberData[event.currentTarget.id];
        this.setState({ showDeleteMemberDialog: true, editedMember: member.email });
    }

    openAddMember = () => {
        this.setState({ showAddMemberDialog: true });
    }

    openUpdateUserSettingsDialog = (event) => {
        const member = this.state.memberData[event.currentTarget.id];
        this.setState({
            showUpdateAdminDialog: true,
            editedMember: member.email,
            memberRoles: {
                isFinanceAdmin: member.isFinanceAdmin,
                isEventAdmin: member.isEventAdmin,
                isYogaAdmin: member.isYogaAdmin,
                isSuperuser: member.isSuperuser
            },
            memberLevel: member.level
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
                        alertMessage: data.deleted,
                        alertParam: 'DELETEDSUCCESSFULLY',
                        alertType: 'INFO'
                    });
                } else {
                    this.setState({ showAlert: true, alertMessage: '', alertParam: 'DELETEFAILED', alertType: 'ERROR' });
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
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
                        alertMessage: data.memberAdded.email,
                        alertParam: 'ADDED',
                        alertType: 'INFO'
                    });
                } else {
                    if (data.exists) {
                        this.setState({ showAlert: true, alertMessage: emailAddress, alertParam: 'ALREADYADDED', alertType: 'WARNING' });
                    } else {
                        this.setState({ showAlert: true, alertMessage: emailAddress, alertParam: 'COULDNTADD', alertType: 'ERROR' });
                    }
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });

        this.setState({ showAddMemberDialog: false });
    }

    handleUpdateUserSettings = (data) => {
        console.log(data);
        const { editedMember } = this.state;

        Client.fetch('/su/updatemember', {
            method: 'PUT',
            body: `{
                "update": "${editedMember}",
                "isFinanceAdmin": "${data.isFinanceAdmin}",
                "isEventAdmin": "${data.isEventAdmin}",
                "isYogaAdmin": "${data.isYogaAdmin}",
                "isSuperuser": "${data.isSuperuser}",
                "level": "${data.level}"
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
                            isSuperuser: data.isSuperuser,
                            level: data.level
                        }
                        : member
                    );
                    this.setState({
                        memberData: newMembers,
                        showAlert: true,
                        alertMessage: data.updated,
                        alertParam: 'ROLEUPDATED',
                        alertType: 'INFO'
                    });
                } else {
                    this.setState({ showAlert: true, alertParam: 'UPDATEFAILED', alertType: 'ERROR' });
                }
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });

        this.setState({ showUpdateAdminDialog: false });
    }

    /* ------------ User rows ------------ */
    // *** CHECK FILTERS *** //
    checkFilters = (user) => {
        const { roleFilter, textFilterValue, registeredFilterValue } = this.state;

        // eslint-disable-next-line no-multi-spaces
        const passedEmailFilter =   user.email.substring(0, user.email.indexOf('@')).toLowerCase().includes(textFilterValue.toLowerCase()) ||
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
                        <td className="settings-cells icon-btn">
                            <Button id={key} onClick={this.openUpdateUserSettingsDialog}>
                                <SettingsIcon />
                            </Button>
                        </td>
                        <td className="delete-icon-cell icon-btn">
                            <Button variant='outline-danger' id={ key } onClick={this.openDelete}>
                                <Bin className='delete-user' />
                            </Button>
                        </td>
                    </tr>
                ) : (null)
            ))
        );
    }

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
            alertParam,
            alertType,
            memberRoles,
            memberLevel
        } = this.state;

        const { ADDMEMBER, NAME, EMAIL } = this.context.dictionary.superuser;
        const { alert } = this.context.dictionary;
        return (
            <div>
                {showAddMemberDialog &&
                    <AddMemberDialog
                        closeDialog = {this.handleCloseDialog}
                        addMember = {this.handleAddMember}
                    />
                }
                { showUpdateAdminDialog &&
                    <UserSettingsDialog
                        memberEmail = {editedMember}
                        memberRoles = {memberRoles}
                        memberLevel = {memberLevel}
                        updateSettings = {this.handleUpdateUserSettings}
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
                { showAlert &&
                    <Alert
                        alertMsg={alert[alertParam] ? `${alertMessage} ${alert[alertParam]}` : alertMessage}
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
                            <th>{NAME}</th>
                            <th>{EMAIL}</th>
                            <th className="settings-icon-column"></th>
                            <th className="delete-icon-column"></th>
                        </tr>
                    </thead>
                    {memberData ? (
                        <tbody id="tableBody">
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <Button className="add-member-btn" variant="success" onClick={this.openAddMember}>
                                        <Plus />
                                        {ADDMEMBER}
                                    </Button>
                                </td>
                            </tr>
                            {this.renderMembers()}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={4}>
                                    <LoadingIndicator
                                        until={!!memberData}
                                        size="1rem"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Table>
            </div>
        );
    }
};

export default Superuser;
