import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../components/Form/GenericDialog/GenericDialog';

import { ReactComponent as FinanceAdminIcon } from '../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../components/icons/superman.svg';

import './UpdateAdminRoles.scss';

import Form from 'react-bootstrap/Form';

class UpdateAdminRoles extends Component {
    state = {
        financeChecked: this.props.status[0],
        eventChecked: this.props.status[1],
        yogaChecked: this.props.status[2],
        superuserChecked: this.props.status[3]
    }

    handleChecked = (event) => {
        const newstate = {};
        newstate[`${event.target.id}Checked`] = !this.state[`${event.target.id}Checked`];
        this.setState(newstate);
    }

    setUpdateAdminRoles = () => {
        const { financeChecked, eventChecked, yogaChecked, superuserChecked } = this.state;
        const roles = {
            isFinanceAdmin: financeChecked,
            isEventAdmin: eventChecked,
            isYogaAdmin: yogaChecked,
            isSuperuser: superuserChecked
        };
        this.props.updateAdminRoles(roles);
    }

    render () {
        const { member, closeDialog } = this.props;
        const { financeChecked, eventChecked, yogaChecked, superuserChecked } = this.state;

        return (
            <GenericDialog
                title = "Update admin role"
                reject = 'Cancel'
                accept = 'Save'
                handleClose = {closeDialog}
                handleAccept = {this.setUpdateAdminRoles}
            >
                <Form onSubmit={this.setUpdateAdminRoles} autoComplete='off' className="role-dialog">
                    <Form.Label>
                        <span className="msg">Update role to&nbsp;</span>
                        <span className="email">{member}</span>
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

UpdateAdminRoles.propTypes = {
    member: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    updateAdminRoles: PropTypes.func.isRequired,
    status: PropTypes.array.isRequired
};

export default UpdateAdminRoles;
