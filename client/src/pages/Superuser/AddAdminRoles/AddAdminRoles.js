import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../components/Form/GenericDialog/GenericDialog';

import { ReactComponent as FinanceAdminIcon } from '../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../components/icons/superman.svg';

import './AddAdminRoles.scss';

import Form from 'react-bootstrap/Form';

class handleAddAdminRoles extends Component {
    state = {
        checkedFinAdmin: false,
        checkedEventAdmin: false,
        checkedYogaAdmin: false,
        checkedSuperuser: false
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

    setAddAdminRoles = () => {
        const { checkedFinAdmin, checkedEventAdmin, checkedYogaAdmin, checkedSuperuser } = this.state;
        const arrayRoles = [
            { isFinanceAdmin: checkedFinAdmin },
            { isEventAdmin: checkedEventAdmin },
            { isYogaAdmin: checkedYogaAdmin },
            { isSuperuser: checkedSuperuser }
        ];
        this.props.addAdminRoles(arrayRoles);
    }

    render () {
        const { user, closeDialog } = this.props;

        return (
            <GenericDialog
                title = "Add admin role"
                reject = 'Cancel'
                accept = 'Add'
                handleClose = {closeDialog}
                handleAccept = {this.setAddAdminRoles}
            >
                <Form onSubmit={this.setAddAdminRoles} autoComplete='off' className="role-dialog">
                    <Form.Label>
                        <span className="msg">Add role to&nbsp;</span>
                        <span className="email">{user}</span>
                        <span className="msg">&nbsp;?</span>
                    </Form.Label>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="fin-admin" onChange={this.handleCheckedFin} />
                        <Form.Check.Label htmlFor="fin-admin">Finance Admin</Form.Check.Label>
                        <FinanceAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="event-admin" onChange={this.handleCheckedEvent} />
                        <Form.Check.Label htmlFor="event-admin">Event Admin</Form.Check.Label>
                        <EventAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="yoga-admin" onChange={this.handleCheckedYoga} />
                        <Form.Check.Label htmlFor="yoga-admin">Yoga Admin</Form.Check.Label>
                        <YogaAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="superuser" onChange={this.handleCheckedSu} />
                        <Form.Check.Label htmlFor="superuser">Superuser</Form.Check.Label>
                        <SuperuserIcon />
                    </Form.Check>
                </Form>
            </GenericDialog>
        );
    }
}

handleAddAdminRoles.propTypes = {
    user: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    addAdminRoles: PropTypes.func.isRequired
};

export default handleAddAdminRoles;
