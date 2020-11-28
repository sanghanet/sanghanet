import React from 'react';

export const DataContext = React.createContext({
    userName: {
        firstName: '',
        lastName: '',
        fullName: '',
        nameOrder: 1
    },
    avatarSrc: '/images/noAvatar.svg',
    setUsername: () => {},
    setAvatarSrc: () => {}
});
