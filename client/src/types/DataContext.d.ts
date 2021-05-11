type DataContextType = {
    userName: {
        firstName: string;
        lastName: string;
        fullName: string;
    };
    getFullName: (firstName: string, lastName: string) => string;
    avatarSrc: string;
    setUsername: (firstName: string, lastName: string) => void;
    setAvatarSrc: (src: string) => void;
};
