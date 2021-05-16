import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import { ReactComponent as FinanceAdminIcon } from '../../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../../components/icons/superman.svg';

import './UserSettingsDialog.scss';

import Form from 'react-bootstrap/Form';

interface UserSettingsDialogProps {
    memberRoles: MemberRoles;
    memberLevel: string;
    memberEmail: string;
    onCloseDialog: React.MouseEventHandler<HTMLButtonElement>;
    onUpdateSettings: (data: UpdateSettingsData) => void;
}

const UserSettingsDialog: React.FC<UserSettingsDialogProps> = (props) => {
    const { memberRoles, memberLevel, memberEmail, onCloseDialog, onUpdateSettings } = props;

    const [financeChecked, setFinanceChecked] = useState(memberRoles.isFinanceAdmin);
    const [eventChecked, setEventChecked] = useState(memberRoles.isEventAdmin);
    const [yogaChecked, setYogaChecked] = useState(memberRoles.isYogaAdmin);
    const [superuserChecked, setSuperuserChecked] = useState(memberRoles.isSuperuser);
    const [level, setLevel] = useState(memberLevel);

    const dictionary = useContext(UIcontext).dictionary;
    const { BEGINNER, INTERMEDIATE, ADVANCED } = dictionary.generalTermsDictionary;
    const { CANCEL, ACCEPT } = dictionary.modalButtons;
    const { UPDATESETTINGS, UPDATEROLE, UPDATELEVELOFSTUDY } = dictionary.superuserUpdateSettings;
    const { FINANCE_ADMIN, EVENT_ADMIN, YOGA_ADMIN, SUPERUSER } = dictionary.pageAndNavbarTitles;

    const handleChecked: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        switch (event.target.id) {
            case 'finance': setFinanceChecked(!financeChecked); break;
            case 'event': setEventChecked(!eventChecked); break;
            case 'yoga': setYogaChecked(!yogaChecked); break;
            case 'superuser': setSuperuserChecked(!superuserChecked); break;
            default:
        }
    };

    const handleLevelChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => { setLevel(event.target.value); };

    const setUpdateMemberRoleDialog = (): void => {
        const data = {
            isFinanceAdmin: financeChecked,
            isEventAdmin: eventChecked,
            isYogaAdmin: yogaChecked,
            isSuperuser: superuserChecked,
            level: level
        };
        onUpdateSettings(data);
    };

    return (
        <GenericDialog
            title={UPDATESETTINGS}
            subtitle={memberEmail}
            reject={CANCEL}
            accept={ACCEPT}
            handleClose={onCloseDialog}
            handleAccept={setUpdateMemberRoleDialog}
        >
            <Form onSubmit={setUpdateMemberRoleDialog} autoComplete="off" className="role-dialog">
                <Form.Group>
                    <Form.Label>
                        <span className="msg">{UPDATEROLE} </span>
                    </Form.Label>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="finance" onChange={handleChecked} defaultChecked={financeChecked} />
                        <Form.Check.Label htmlFor="finance">{FINANCE_ADMIN}</Form.Check.Label>
                        <FinanceAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="event" onChange={handleChecked} defaultChecked={eventChecked} />
                        <Form.Check.Label htmlFor="event">{EVENT_ADMIN}</Form.Check.Label>
                        <EventAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="yoga" onChange={handleChecked} defaultChecked={yogaChecked} />
                        <Form.Check.Label htmlFor="yoga">{YOGA_ADMIN}</Form.Check.Label>
                        <YogaAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="superuser" onChange={handleChecked} defaultChecked={superuserChecked} />
                        <Form.Check.Label htmlFor="superuser">{SUPERUSER}</Form.Check.Label>
                        <SuperuserIcon />
                    </Form.Check>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        <span className="msg">{UPDATELEVELOFSTUDY}</span>
                    </Form.Label>
                    <Form.Control as="select" defaultValue={level} size="sm" className="level-of-study" onChange={handleLevelChange}>
                        <option value="" disabled hidden />
                        <option value="beginner">{BEGINNER}</option>
                        <option value="intermediate">{INTERMEDIATE}</option>
                        <option value="advanced">{ADVANCED}</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </GenericDialog>
    );
};

UserSettingsDialog.propTypes = {
    memberRoles: PropTypes.exact({
        isFinanceAdmin: PropTypes.bool.isRequired,
        isEventAdmin: PropTypes.bool.isRequired,
        isYogaAdmin: PropTypes.bool.isRequired,
        isSuperuser: PropTypes.bool.isRequired
    }).isRequired,
    memberLevel: PropTypes.string.isRequired,
    memberEmail: PropTypes.string.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    onUpdateSettings: PropTypes.func.isRequired
};

export default UserSettingsDialog;
