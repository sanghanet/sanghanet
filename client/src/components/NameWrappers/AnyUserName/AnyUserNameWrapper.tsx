import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext/DataContext';

const AnyUserNameWrapper = (firstName: string, lastName: string): string => {
    return useContext(DataContext).getFullName(firstName, lastName);
};

export default AnyUserNameWrapper;
