import React from 'react';

export const HamburgerContext = React.createContext({
    isHamburgerOpen: false,
    toggleHamburger: () => {},
    closeHamburger: () => {}
});
