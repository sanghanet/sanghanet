import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../../../components/Form/GenericDialog/GenericDialog';

import { ReactComponent as FinanceAdminIcon } from '../../../components/icons/finances.svg';
import { ReactComponent as EventAdminIcon } from '../../../components/icons/event.svg';
import { ReactComponent as YogaAdminIcon } from '../../../components/icons/yoga.svg';
import { ReactComponent as SuperuserIcon } from '../../../components/icons/superman.svg';

import './AddAdminRoles.scss';

import Form from 'react-bootstrap/Form';

class AddAdminRoles extends Component {
    state = {
        checkedFinAdmin: false,
        checkedEventAdmin: false,
        checkedYogaAdmin: false,
        checkedSuperuser: false,
        isFinAdmin: false,
        isEventAdmin: false,
        isYogaAdmin: false,
        isSuperuser: false
    }

    handleChecked = () => {
        console.log('checked');
        this.setState((prevState) => ({ checkedFinAdmin: !prevState.checkedFinAdmin }));
        // const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        // for (const checkbox of checkboxes) {
        //   document.body.append(checkbox.value + ' ');
        // }
    }

    render () {
        const { user, closeDialog, addAdminRoles } = this.props;
        const { checkedFinAdmin, checkedEventAdmin, checkedYogaAdmin, checkedSuperuser } = this.state;

        return (
            <GenericDialog
                title = "Add admin role"
                reject = 'Cancel'
                accept = 'Add'
                handleClose = {closeDialog}
                handleAccept = {addAdminRoles}
            >
                <Form onSubmit={addAdminRoles} autoComplete='off' className="role-dialog">
                    <Form.Label htmlFor="digits-label">
                        <span className="msg">Add role to&nbsp;</span>
                        <span className="email">{user}</span>
                        <span className="msg">&nbsp;?</span>
                    </Form.Label>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="fin-admin" onChange={this.handleChecked} checked={checkedFinAdmin} />
                        <Form.Check.Label htmlFor="fin-admin">Finance Admin</Form.Check.Label>
                        <FinanceAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="event-admin" checked={checkedEventAdmin} />
                        <Form.Check.Label htmlFor="event-admin">Event Admin</Form.Check.Label>
                        <EventAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="yoga-admin" checked={checkedYogaAdmin} />
                        <Form.Check.Label htmlFor="yoga-admin">Yoga Admin</Form.Check.Label>
                        <YogaAdminIcon />
                    </Form.Check>
                    <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" id="superuser" checked={checkedSuperuser} />
                        <Form.Check.Label htmlFor="superuser">Superuser</Form.Check.Label>
                        <SuperuserIcon />
                    </Form.Check>
                </Form>
            </GenericDialog>
        );
    }
}

AddAdminRoles.propTypes = {
    user: PropTypes.string.isRequired,
    closeDialog: PropTypes.func.isRequired,
    addAdminRoles: PropTypes.func.isRequired
};

export default AddAdminRoles;
