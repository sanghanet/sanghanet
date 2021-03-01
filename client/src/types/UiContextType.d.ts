type UiContextType = {
    isHamburgerOpen: boolean,
    toggleHamburger: () => void,
    closeHamburger: () => void,

    isSuperuser: boolean,
    isFinanceAdmin: boolean,
    isEventAdmin: boolean,
    isYogaAdmin: boolean,
    setAccess: (a: boolean, b: boolean, c: boolean, d: boolean) => void,

    lang: LANGUAGE,
    dictionary: DictionaryType,
    changeLang: (lang: LANGUAGE) => void
};
