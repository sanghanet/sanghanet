import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../contexts/DataContext/DataContext';

const AnyUserNameWrapper = (props) => {
    const { getFullName } = useContext(DataContext);
    const { firstName, lastName } = props;

    return <>{getFullName(firstName, lastName)}</>;
};

AnyUserNameWrapper.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
};

export default AnyUserNameWrapper;
