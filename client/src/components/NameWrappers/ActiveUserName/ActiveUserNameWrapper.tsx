import React, { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext/DataContext';

const ActiveUserNameWrapper: React.FC = () => {
    const { fullName } = useContext(DataContext).userName;
    return <>{fullName}</>;
};

export default ActiveUserNameWrapper;
