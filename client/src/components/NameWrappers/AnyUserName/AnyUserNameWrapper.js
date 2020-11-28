import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../contexts/DataContext/DataContext';

const AnyUserNameWrapper = (props) => {
    const { nameOrder } = useContext(DataContext).userName;
    const { firstName, lastName } = props;

    // ['John', 'Doe'].sort(() => -1)   ===   ['Doe', 'John']
    return <>{[firstName, lastName].sort(() => nameOrder).join(' ')}</>;
}

AnyUserNameWrapper.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
}

export default AnyUserNameWrapper;

