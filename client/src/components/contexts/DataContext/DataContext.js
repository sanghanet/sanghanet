import React from 'react';

export const DataContext = React.createContext({
    userName: {
        firstName: '',
        lastName: '',
        fullName: '',
        nameOrder: 'normal'
    },
    getFullName: () => {},
    avatarSrc: '/images/noAvatar.svg',
    setUsername: () => {},
    setAvatarSrc: () => {}
});
