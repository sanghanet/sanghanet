import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import './Alert.scss';
import { ReactComponent as Error } from '../icons/errorAlert.svg';
// import { ReactComponent as Info } from '../icons/infoAlert.svg';
// import { ReactComponent as Warning } from '../icons/warningAlert.svg';

function Alert (props) {
    const { alertShow, alertClose, alertMsg } = props;

    return (
        <Toast onClose={alertClose} show={alertShow} delay={4000} autohide>
            <Toast.Header>
                <Error className="error-alert" />
                <strong className="mr-auto">Error notification</strong>
            </Toast.Header>
            <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
    );
}

Alert.propTypes = {
    alertShow: PropTypes.bool.isRequired,
    alertClose: PropTypes.func.isRequired,
    alertMsg: PropTypes.string
};

export default Alert;
