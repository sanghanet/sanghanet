import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../contexts/DataContext/DataContext';

const AnyUserNameWrapper = (props) => {
    const { nameOrder } = useContext(DataContext).userName;
    const { firstName, lastName } = props;
    const names = [firstName, lastName];

    const namesInOrder = nameOrder === 'reverse' ? names.reverse() : names;

    return <>{namesInOrder.join(' ')}</>;
};

AnyUserNameWrapper.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
};

export default AnyUserNameWrapper;
