import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';
import './Alert.scss';
import { ReactComponent as Error } from '../icons/errorAlert.svg';
import { ReactComponent as Info } from '../icons/infoAlert.svg';
import { ReactComponent as Warning } from '../icons/warningAlert.svg';

function Alert (props) {
    // alertType can be Error, Warning and Info
    // delay={4000} autohide
    const { alertClose, alertMsg, alertType } = props;
    return (
        <Toast onClose={alertClose} show={true}>
            <Toast.Header>
                {
                    {
                        Error: <Error className={'error alert-icon'} />,
                        Warning: <Warning className={'warning alert-icon'} />,
                        Info: <Info className={'info alert-icon'} />
                    }[alertType]
                }
                <strong className="mr-auto">{alertType} notification</strong>
            </Toast.Header>
            <Toast.Body>{alertMsg}</Toast.Body>
        </Toast>
    );
}

Alert.propTypes = {
    alertClose: PropTypes.func.isRequired,
    alertMsg: PropTypes.string,
    alertType: PropTypes.string.isRequired
};

export default Alert;
