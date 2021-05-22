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

const Superuser: React.FC<Record<string, unknown>> = (props) => {
    const defaultRoleFilter = {
        filterSuperuser: false,
        filterFinanceAdmin: false,
        filterEventAdmin: false,
        filterYogaAdmin: false,
        filterNoRole: false
    };

    const [members, setMembers] = useState<MemberData[]>([]);
    const [editedMember, setEditedMember] = useState('');
    const [textFilterValue, setTextFilterValue] = useState('');
    const [registeredFilterValue, setRegisteredFilterValue] = useState('all');
    const [roleFilter, setRoleFilter] = useState(defaultRoleFilter);
    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
    const [showDeleteMemberDialog, setShowDeleteMemberDialog] = useState(false);
    const [showUpdateAdminDialog, setShowUpdateAdminDialog] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<ALERT>('NOALERT');
    const [alertParam, setAlertParam] = useState('');
    const [memberRoles, setMemberRoles] = useState<MemberRoles | null>(null);
    const [memberLevel, setMemberLevel] = useState('');

    /* ------------ General functions ------------ */
    const displayAlert = (isShown: boolean, msg: string, type: ALERT, param: string): void => {
        setShowAlert(isShown);
        setAlertMessage(msg);
        setAlertType(type);
        param !== undefined && setAlertParam(param);
    };

    const displayError = (err: Error): void => {
        displayAlert(true, err.message, 'ERROR', '');
    };

    useEffect(() => {
        Client.fetch('/su/getmemberdata', {
            method: 'POST',
            fields: ['email', 'isSuperuser', 'isFinanceAdmin', 'isEventAdmin', 'isYogaAdmin', 'label', 'registered', 'level']
        })
            .then((data) => {
                setMembers(data.reverse());
            }).catch((err) => {
                displayError(err);
            });
    }, []);

    const closeAlert = (): void => {
        displayAlert(false, '', 'NOALERT', '');
    };

    /* ------------ FilterAccordion functions ------------ */
    const handleEmailFilterChange = (inputValue: string): void => {
        setTextFilterValue(inputValue);
    };

    const handleSearchIconClick: React.MouseEventHandler<HTMLLabelElement> = (event) => {
        event.preventDefault();
        setTextFilterValue('');
    };

    const handleRegisteredFilterChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setRegisteredFilterValue(event.target.value);
    };

    const handleRoleChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const tempRoleState = { ...roleFilter };
        const role = event.currentTarget.id as ADMIN_ROLE;
        tempRoleState[role] = !tempRoleState[role];
        setRoleFilter(tempRoleState);
    };

    const handleResetFilters: React.MouseEventHandler<HTMLButtonElement> = () => {
        setTextFilterValue('');
        setRoleFilter(defaultRoleFilter);
        setRegisteredFilterValue('all');
    };

    /* ------------ Dialog functions ------------ */
    // *** OPEN / CLOSE *** //
    const handleOpenDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const member = members[Number(event.currentTarget.id)];
        setShowDeleteMemberDialog(true);
        setEditedMember(member.email);
    };

    const handleOpenAddMember: React.MouseEventHandler<HTMLButtonElement> = () => {
        setShowAddMemberDialog(true);
    };

    const handleOpenUpdateUserSettingsDialog: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const member = members[Number(event.currentTarget.id)];
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

    const handleCloseDialog: React.MouseEventHandler<HTMLButtonElement> = () => {
        setShowDeleteMemberDialog(false);
        setShowAddMemberDialog(false);
        setShowUpdateAdminDialog(false);
    };

    // *** FETCH *** //
    const handleDeleteMember: React.MouseEventHandler<HTMLButtonElement> = () => {
        Client.fetch('/su/deletemember', {
            method: 'DELETE',
            body: `{"remove": "${editedMember}"}`
        })
            .then((data) => {
                if (data.deleted) {
                    setMembers(members.filter((member) => member.email !== data.deleted));
                    displayAlert(true, data.deleted, 'INFO', 'DELETEDSUCCESSFULLY');
                } else {
                    displayAlert(true, '', 'ERROR', 'DELETEFAILED');
                }
            }).catch((err) => {
                displayError(err);
            });

        setShowDeleteMemberDialog(false);
    };

    const handleAddMember = (emailAddress: string, label: string): void => {
        Client.fetch('/su/addmember', {
            method: 'POST',
            body: `{"email": "${emailAddress}", "label": "${label}"}`
        })
            .then((data) => {
                if (data.memberAdded) {
                    setMembers([...members, data.memberAdded]);
                    displayAlert(true, data.memberAdded.email, 'INFO', 'ADDED');
                } else {
                    if (data.exists) {
                        displayAlert(true, emailAddress, 'WARNING', 'ALREADYADDED');
                    } else {
                        displayAlert(true, emailAddress, 'ERROR', 'COULDNTADD');
                    }
                }
            }).catch((err) => {
                displayError(err);
            });

        setShowAddMemberDialog(false);
    };

    const handleUpdateUserSettings = (data: UpdateSettingsData): void => {
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
                    const newMembers = members.map((member) => member.email === data.updated
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
                    setMembers(newMembers);
                    displayAlert(true, data.updated, 'INFO', 'SETTINGSUPDATED');
                } else {
                    displayAlert(true, '', 'ERROR', 'UPDATEFAILED');
                }
            }).catch((err) => {
                displayError(err);
            });

        setShowUpdateAdminDialog(false);
    };

    /* ------------ User rows ------------ */
    // *** CHECK FILTERS *** //
    const checkFilters = (user: MemberData): boolean => {
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
    const renderMembers = (): Array<JSX.Element | null> => {
        return members.map((user, index) => {
            // check if user passes all filters
            if (checkFilters(user)) {
                const id = index.toString();
                return (
                    <tr key={index}>
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
                            <Button id={id} onClick={handleOpenUpdateUserSettingsDialog}>
                                <SettingsIcon />
                            </Button>
                        </td>
                        <td className="delete-icon-cell icon-btn">
                            <Button variant="outline-danger" id={id} onClick={handleOpenDelete}>
                                <Bin className="delete-user" />
                            </Button>
                        </td>
                    </tr>
                );
            }
            return null;
        });
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
            {showUpdateAdminDialog && memberRoles != null &&
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
                {members
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
                                        until={!!members}
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
