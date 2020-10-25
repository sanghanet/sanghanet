import React from 'react';

export const DataContext = React.createContext({
    userName: 'unknown',
    avatarSrc: '/images/noAvatar.svg',
    setUsername: () => {},
    setAvatarSrc: () => {}
});
