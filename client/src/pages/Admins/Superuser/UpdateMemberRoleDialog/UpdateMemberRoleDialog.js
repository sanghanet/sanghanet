import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import { ReactComponent as FinanceAdminIcon } from '../../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../../components/icons/superman.svg';

import './UpdateMemberRoleDialog.scss';

import Form from 'react-bootstrap/Form';

class UpdateMemberRoleDialog extends Component {
    static contextType = UIcontext;

    state = {
        financeChecked: this.props.memberRoles.isFinanceAdmin,
        eventChecked: this.props.memberRoles.isEventAdmin,
        yogaChecked: this.props.memberRoles.isYogaAdmin,
        superuserChecked: this.props.memberRoles.isSuperuser
    }

    handleChecked = (event) => {
        const newstate = {};
        newstate[`${event.target.id}Checked`] = !this.state[`${event.target.id}Checked`];
        this.setState(newstate);
    }

    setUpdateMemberRoleDialog = () => {
        const { financeChecked, eventChecked, yogaChecked, superuserChecked } = this.state;
        const roles = {
            isFinanceAdmin: financeChecked,
            isEventAdmin: eventChecked,
            isYogaAdmin: yogaChecked,
            isSuperuser: superuserChecked
        };
        this.props.UPDATESETTINGS(roles);
    }

    render () {
        const { memberEmail, closeDialog } = this.props;
        const { financeChecked, eventChecked, yogaChecked, superuserChecked } = this.state;
        const { CANCEL, ACCEPT } = this.context.dictionary.modalButtons;
        const { UPDATESETTINGS, UPDATEROLE, UPDATELEVELOFSTUDY } = this.context.dictionary.superuserUpdateSettings;
        const { FINANCE_ADMIN, EVENT_ADMIN, YOGA_ADMIN, SUPERUSER } = this.context.dictionary.pageAndNavbarTitles;

        return (
            <GenericDialog
                title = {UPDATESETTINGS}
                subtitle = {memberEmail}
                reject = {CANCEL}
                accept = {ACCEPT}
                handleClose = {closeDialog}
                handleAccept = {this.setUpdateMemberRoleDialog}
            >
                <Form onSubmit={this.setUpdateMemberRoleDialog} autoComplete='off' className="role-dialog">
                    <Form.Group>
                        <Form.Label>
                            <span className="msg">{UPDATEROLE} </span>
                        </Form.Label>
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox" id="finance" onChange={this.handleChecked} defaultChecked={financeChecked} />
                            <Form.Check.Label htmlFor="finance">{FINANCE_ADMIN}</Form.Check.Label>
                            <FinanceAdminIcon />
                        </Form.Check>
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox" id="event" onChange={this.handleChecked} defaultChecked={eventChecked} />
                            <Form.Check.Label htmlFor="event">{EVENT_ADMIN}</Form.Check.Label>
                            <EventAdminIcon />
                        </Form.Check>
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox" id="yoga" onChange={this.handleChecked} defaultChecked={yogaChecked} />
                            <Form.Check.Label htmlFor="yoga">{YOGA_ADMIN}</Form.Check.Label>
                            <YogaAdminIcon />
                        </Form.Check>
                        <Form.Check type="checkbox">
                            <Form.Check.Input type="checkbox" id="superuser" onChange={this.handleChecked} defaultChecked={superuserChecked} />
                            <Form.Check.Label htmlFor="superuser">{SUPERUSER}</Form.Check.Label>
                            <SuperuserIcon />
                        </Form.Check>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            <span className="msg">{UPDATELEVELOFSTUDY}</span>
                        </Form.Label>
                        <Form.Control as="select" size="sm" custom className="level-of-study">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </GenericDialog>
        );
    }
}

UpdateMemberRoleDialog.propTypes = {
    memberRoles: PropTypes.object.isRequired,
    memberEmail: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    UPDATESETTINGS: PropTypes.func.isRequired
};

export default UpdateMemberRoleDialog;
