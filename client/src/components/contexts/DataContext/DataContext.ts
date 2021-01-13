import React from 'react';

export const DataContext = React.createContext<DataContextType>({
    userName: {
        firstName: '',
        lastName: '',
        fullName: ''
    },
    getFullName: () => { return 'Oops, default DataContext available only!'},
    avatarSrc: '/images/noAvatar.svg',
    setUsername: () => {},
    setAvatarSrc: () => {}
});
