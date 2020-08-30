import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import Toast from 'react-bootstrap/Toast';
import './Alert.scss';
import { ReactComponent as Error } from '../icons/errorAlert.svg';
import { ReactComponent as Info } from '../icons/infoAlert.svg';
import { ReactComponent as Warning } from '../icons/warningAlert.svg';

function Alert (props) {
    // alertType can be ERROR, WARNING and INFO
    const { alertClose, alertMsg, alertType } = props;
    const { alert } = useContext(UIcontext).dictionary;

    return (
        <Toast onClose={alertClose} show={true} delay={4000} autohide>
            <Toast.Header className={alertType}>
                {
                    {
                        ERROR: <Error className={'alert-icon'} />,
                        WARNING: <Warning className={'alert-icon'} />,
                        INFO: <Info className={'alert-icon'} />
                    }[alertType]
                }
                <strong className="mr-auto">{alert[alertType]}</strong>
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
