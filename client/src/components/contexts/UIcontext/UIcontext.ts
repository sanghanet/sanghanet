import React from 'react';
import { dictionaryList } from '../../../languages/dictionaryList';

export const UIcontext = React.createContext<UiContextType>({
    isHamburgerOpen: false,
    toggleHamburger: () => { /* do nothing */ },
    closeHamburger: () => { /* do nothing */ },
    isSuperuser: false,
    isFinanceAdmin: false,
    isEventAdmin: false,
    isYogaAdmin: false,
    setAccess: () => { /* do nothing */ },
    lang: 'en',
    // eslint-disable-next-line dot-notation
    dictionary: dictionaryList['en'],
    changeLang: () => { /* do nothing */ }
});
