/* ------------ Imports ------------ */
import React, { useContext, useEffect, useState } from 'react';
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

const Superuser = (props) => {
    const defaultRoleFilter = {
        filterSuperuser: false,
        filterFinanceAdmin: false,
        filterEventAdmin: false,
        filterYogaAdmin: false,
        filterNoRole: false
    };

    const [memberData, setMemberData] = useState(null);
    const [editedMember, setEditedMember] = useState(null);
    const [textFilterValue, setTextFilterValue] = useState('');
    const [registeredFilterValue, setRegisteredFilterValue] = useState('all');
    const [roleFilter, setRoleFilter] = useState(defaultRoleFilter);
    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
    const [showDeleteMemberDialog, setShowDeleteMemberDialog] = useState(false);
    const [showUpdateAdminDialog, setShowUpdateAdminDialog] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertParam, setAlertParam] = useState('');
    const [memberRoles, setMemberRoles] = useState({});
    const [memberLevel, setMemberLevel] = useState('');

    /* ------------ General functions ------------ */
    const updateAlertSettings = (isShown, msg, type, param) => {
        setShowAlert(isShown);
        setAlertMessage(msg);
        setAlertType(type);
        param !== undefined && setAlertParam(param);
    };

    const showError = (err) => {
        updateAlertSettings(true, err.message, 'ERROR', '');
    };

    useEffect(() => {
        Client.fetch('/su/getmemberdata', {
            method: 'POST',
            fields: ['email', 'isSuperuser', 'isFinanceAdmin', 'isEventAdmin', 'isYogaAdmin', 'label', 'registered', 'level']
        })
            .then((data) => {
                setMemberData(data.reverse());
            }).catch((err) => {
                showError(err);
            });
    }, []);

    const closeAlert = () => {
        updateAlertSettings(false, '', '', '');
    };

    /* ------------ FilterAccordion functions ------------ */
    const handleEmailFilterChange = (inputValue) => {
        setTextFilterValue(inputValue);
    };

    const handleSearchIconClick = (event) => {
        event.preventDefault();
        setTextFilterValue('');
    };

    const handleRegisteredFilterChange = (event) => {
        setRegisteredFilterValue(event.target.value);
    };

    const handleRoleChange = (event) => {
        const tempRoleState = { ...roleFilter };
        tempRoleState[event.target.id] = !tempRoleState[event.target.id];
        setRoleFilter(tempRoleState);
    };

    const handleResetFilters = () => {
        setTextFilterValue('');
        setRoleFilter(defaultRoleFilter);
        setRegisteredFilterValue('all');
    };

    /* ------------ Dialog functions ------------ */
    // *** OPEN / CLOSE *** //
    const handleOpenDelete = (event) => {
        const member = memberData[event.currentTarget.id];
        setShowDeleteMemberDialog(true);
        setEditedMember(member.email);
    };

    const handleOpenAddMember = () => {
        setShowAddMemberDialog(true);
    };

    const handleOpenUpdateUserSettingsDialog = (event) => {
        const member = memberData[event.currentTarget.id];
        setShowUpdateAdminDialog(true);
        setEditedMember(member.email);
        setMemberRoles({
            isFinanceAdmin: member.isFinanceAdmin,
            isEventAdmin: member.isEventAdmin,
            isYogaAdmin: member.isYogaAdmin,
            isSuperuser: member.isSuperuser
        });
        setMemberLevel(member.level);
    };

    const handleCloseDialog = () => {
        setShowDeleteMemberDialog(false);
        setShowAddMemberDialog(false);
        setShowUpdateAdminDialog(false);
    };

    // *** FETCH *** //
    const handleDeleteMember = (event) => {
        Client.fetch('/su/deletemember', {
            method: 'DELETE',
            body: `{"remove": "${editedMember}"}`
        })
            .then((data) => {
                if (data.deleted) {
                    setMemberData(memberData.filter((member) => member.email !== data.deleted));
                    updateAlertSettings(true, data.deleted, 'INFO', 'DELETEDSUCCESSFULLY');
                } else {
                    updateAlertSettings(true, '', 'ERROR', 'DELETEFAILED');
                }
            }).catch((err) => {
                showError(err);
            });

        setShowDeleteMemberDialog(false);
    };

    const handleAddMember = (emailAddress, label) => {
        Client.fetch('/su/addmember', {
            method: 'POST',
            body: `{"email": "${emailAddress}", "label": "${label}"}`
        })
            .then((data) => {
                if (data.memberAdded) {
                    setMemberData([...memberData, data.memberAdded]);
                    updateAlertSettings(true, data.memberAdded.email, 'INFO', 'ADDED');
                } else {
                    if (data.exists) {
                        updateAlertSettings(true, emailAddress, 'WARNING', 'ALREADYADDED');
                    } else {
                        updateAlertSettings(true, emailAddress, 'ERROR', 'COULDNTADD');
                    }
                }
            }).catch((err) => {
                showError(err);
            });

        setShowAddMemberDialog(false);
    };

    const handleUpdateUserSettings = (data) => {
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
                    const newMembers = memberData.map((member) => member.email === data.updated
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
                    setMemberData(newMembers);
                    updateAlertSettings(true, data.updated, 'INFO', 'SETTINGSUPDATED');
                } else {
                    updateAlertSettings(true, '', 'ERROR', 'UPDATEFAILED');
                }
            }).catch((err) => {
                showError(err);
            });

        setShowUpdateAdminDialog(false);
    };

    /* ------------ User rows ------------ */
    // *** CHECK FILTERS *** //
    const checkFilters = (user) => {
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
    };

    // *** RENDER ROWS *** //
    const renderMembers = () => {
        return (
            memberData.map((user, key) => (
                // check if user passes all filters
                checkFilters(user)
                    ? (
                        <tr key={key}>
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
                                <Button id={key} onClick={handleOpenUpdateUserSettingsDialog}>
                                    <SettingsIcon />
                                </Button>
                            </td>
                            <td className="delete-icon-cell icon-btn">
                                <Button variant="outline-danger" id={key} onClick={handleOpenDelete}>
                                    <Bin className="delete-user" />
                                </Button>
                            </td>
                        </tr>
                    )
                    : null
            ))
        );
    };

    const { ADDMEMBER, NAME, EMAIL } = useContext(UIcontext).dictionary.superuser;
    const { alert } = useContext(UIcontext).dictionary;

    return (
        <div>
            {showAddMemberDialog &&
                <AddMemberDialog
                    onCloseDialog={handleCloseDialog}
                    onAddMember={handleAddMember}
                />}
            {showUpdateAdminDialog &&
                <UserSettingsDialog
                    memberEmail={editedMember}
                    memberRoles={memberRoles}
                    memberLevel={memberLevel}
                    onUpdateSettings={handleUpdateUserSettings}
                    onCloseDialog={handleCloseDialog}
                />}
            {showDeleteMemberDialog &&
                <DeleteMemberDialog
                    member={editedMember}
                    randomNumber={Math.floor(1000 + Math.random() * 9000)}
                    onDeleteMember={handleDeleteMember}
                    onCloseDialog={handleCloseDialog}
                />}
            {showAlert &&
                <Alert
                    alertMsg={alert[alertParam] ? `${alertMessage} ${alert[alertParam]}` : alertMessage}
                    alertType={alertType}
                    alertClose={closeAlert}
                />}
            <FilterAccordion
                onEmailFilterChange={handleEmailFilterChange}
                onSearchIconClick={handleSearchIconClick}
                onRegisteredFilterChange={handleRegisteredFilterChange}
                onRoleChange={handleRoleChange}
                onResetFilters={handleResetFilters}
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
                        <th className="settings-icon-column" />
                        <th className="delete-icon-column" />
                    </tr>
                </thead>
                {memberData
                    ? (
                        <tbody id="tableBody">
                            <tr>
                                <td colSpan={5} className="p-0">
                                    <Button className="add-member-btn" variant="success" onClick={handleOpenAddMember}>
                                        <Plus />
                                        {ADDMEMBER}
                                    </Button>
                                </td>
                            </tr>
                            {renderMembers()}
                        </tbody>
                    )
                    : (
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
};

export default Superuser;
