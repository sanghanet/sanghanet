import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext/DataContext';

const ActiveUserNameWrapper = (props) => {
    const { fullName } = useContext(DataContext).userName;
    return <>{fullName}</>;
}

export default ActiveUserNameWrapper;
