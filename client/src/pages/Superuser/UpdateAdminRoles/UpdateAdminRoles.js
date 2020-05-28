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
        checkedFinAdmin: this.props.status[0],
        checkedEventAdmin: this.props.status[1],
        checkedYogaAdmin: this.props.status[2],
        checkedSuperuser: this.props.status[3]
    }

    handleCheckedFin = () => {
        this.setState({ checkedFinAdmin: !this.state.checkedFinAdmin });
    }

    handleCheckedEvent = () => {
        this.setState({ checkedEventAdmin: !this.state.checkedEventAdmin });
    }

    handleCheckedYoga = () => {
        this.setState({ checkedYogaAdmin: !this.state.checkedYogaAdmin });
    }

    handleCheckedSu = () => {
        this.setState({ checkedSuperuser: !this.state.checkedSuperuser });
    }

    setUpdateAdminRoles = () => {
        const { checkedFinAdmin, checkedEventAdmin, checkedYogaAdmin, checkedSuperuser } = this.state;
        const roles = {
            isFinanceAdmin: checkedFinAdmin,
            isEventAdmin: checkedEventAdmin,
            isYogaAdmin: checkedYogaAdmin,
            isSuperuser: checkedSuperuser
        };
        this.props.updateAdminRoles(roles);
    }

    render () {
        const { user, closeDialog } = this.props;
        const { checkedFinAdmin, checkedEventAdmin, checkedYogaAdmin, checkedSuperuser } = this.state;

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
                        <span className="email">{user}</span>
                        <span className="msg">&nbsp;?</span>
                    </Form.Label>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="finance" onChange={this.handleCheckedFin} defaultChecked={checkedFinAdmin} />
                        <Form.Check.Label htmlFor="finance">Finance Admin</Form.Check.Label>
                        <FinanceAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="event" onChange={this.handleCheckedEvent} defaultChecked={checkedEventAdmin} />
                        <Form.Check.Label htmlFor="event">Event Admin</Form.Check.Label>
                        <EventAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="yoga" onChange={this.handleCheckedYoga} defaultChecked={checkedYogaAdmin} />
                        <Form.Check.Label htmlFor="yoga">Yoga Admin</Form.Check.Label>
                        <YogaAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="superuser" onChange={this.handleCheckedSu} defaultChecked={checkedSuperuser} />
                        <Form.Check.Label htmlFor="superuser">Superuser</Form.Check.Label>
                        <SuperuserIcon />
                    </Form.Check>
                </Form>
            </GenericDialog>
        );
    }
}

UpdateAdminRoles.propTypes = {
    user: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    updateAdminRoles: PropTypes.func.isRequired,
    status: PropTypes.array.isRequired
};

export default UpdateAdminRoles;
