import React from 'react';

export const DataContext = React.createContext({
    userName: {
        firstName: '',
        lastName: '',
        fullName: ''
    },
    getFullName: () => {},
    avatarSrc: '/images/noAvatar.svg',
    setUsername: () => {},
    setAvatarSrc: () => {}
});
