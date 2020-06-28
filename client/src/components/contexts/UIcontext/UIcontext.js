import React from 'react';

export const UIcontext = React.createContext({
    isHamburgerOpen: false,
    toggleHamburger: () => {},
    closeHamburger: () => {},
    isSuperuser: false,
    isFinanceAdmin: false,
    isEventAdmin: false,
    isYogaAdmin: false,
    setAccess: () => {}
});
