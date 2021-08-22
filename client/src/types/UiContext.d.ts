type UiContextType = {
    isHamburgerOpen: boolean;
    toggleHamburger: () => void;
    closeHamburger: () => void;
    mobileView: boolean;
    setMobileView: (w: number) => void;
    showSubmenu: boolean;
    setShowSubmenu: (b: boolean) => void;

    isSuperuser: boolean;
    isFinanceAdmin: boolean;
    isEventAdmin: boolean;
    isYogaAdmin: boolean;
    setAccess: (a: boolean, b: boolean, c: boolean, d: boolean) => void;

    lang: LANGUAGE;
    dictionary: DictionaryType;
    changeLang: (lang: LANGUAGE) => void;
};
