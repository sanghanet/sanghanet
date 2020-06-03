import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../../components/Form/GenericDialog/GenericDialog';

import { ReactComponent as FinanceAdminIcon } from '../../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../../components/icons/superman.svg';

import './UpdateMemberRoleDialog.scss';

import Form from 'react-bootstrap/Form';

class UpdateMemberRoleDialog extends Component {
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
        this.props.updateRole(roles);
    }

    render () {
        const { memberEmail, closeDialog } = this.props;
        const { financeChecked, eventChecked, yogaChecked, superuserChecked } = this.state;

        return (
            <GenericDialog
                title = "Update admin role"
                reject = 'Cancel'
                accept = 'Save'
                handleClose = {closeDialog}
                handleAccept = {this.setUpdateMemberRoleDialog}
            >
                <Form onSubmit={this.setUpdateMemberRoleDialog} autoComplete='off' className="role-dialog">
                    <Form.Label>
                        <span className="msg">Update role to&nbsp;</span>
                        <span className="email">{memberEmail}</span>
                        <span className="msg">&nbsp;?</span>
                    </Form.Label>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="finance" onChange={this.handleChecked} defaultChecked={financeChecked} />
                        <Form.Check.Label htmlFor="finance">Finance Admin</Form.Check.Label>
                        <FinanceAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="event" onChange={this.handleChecked} defaultChecked={eventChecked} />
                        <Form.Check.Label htmlFor="event">Event Admin</Form.Check.Label>
                        <EventAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="yoga" onChange={this.handleChecked} defaultChecked={yogaChecked} />
                        <Form.Check.Label htmlFor="yoga">Yoga Admin</Form.Check.Label>
                        <YogaAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="superuser" onChange={this.handleChecked} defaultChecked={superuserChecked} />
                        <Form.Check.Label htmlFor="superuser">Superuser</Form.Check.Label>
                        <SuperuserIcon />
                    </Form.Check>
                </Form>
            </GenericDialog>
        );
    }
}

UpdateMemberRoleDialog.propTypes = {
    memberRoles: PropTypes.object.isRequired,
    memberEmail: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    updateRole: PropTypes.func.isRequired
};

export default UpdateMemberRoleDialog;