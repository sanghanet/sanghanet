import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext/DataContext';

const ActiveUserNameWrapper = (): string => {
    return useContext(DataContext).userName.fullName;
};

export default ActiveUserNameWrapper;
