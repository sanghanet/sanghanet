import { join } from 'path';

const getAvatarFilePath = (avatar: string): string => {
    avatar = './' + avatar;
    return join(__dirname, avatar);
};

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface Member {
    label: string;
    email: string;
    registered: boolean;
    isSuperuser: boolean;
    isFinanceAdmin: boolean;
    isEventAdmin: boolean;
    isYogaAdmin: boolean;
    level: Level;
}

interface RegistrationDetails {
    firstName: string;
    lastName: string;
    spiritualName: string;
    avatar: string;
}

type RegistratingUser = {
    member: Member;
    password: string;
    registrationDetails: RegistrationDetails;
};

const baseMember: Member = {
    label: 'Teszt Elek',
    email: '',
    registered: false,
    isSuperuser: false,
    isFinanceAdmin: false,
    isEventAdmin: false,
    isYogaAdmin: false,
    level: 'BEGINNER',
};

const baseRegistrationDetails: RegistrationDetails = {
    firstName: 'First',
    lastName: 'Last',
    spiritualName: 'Spiritual',
    avatar: getAvatarFilePath('avatar.JPG'),
};

const registratingUserEmail = 'userforsangha@gmail.com';
const registratingUserPassword = 'RandomPassword123';

export const registratingUser: RegistratingUser = {
    member: {
        ...baseMember,
        email: registratingUserEmail,
    },
    password: registratingUserPassword,
    registrationDetails: baseRegistrationDetails,
};

export const registratingUserUnhappyPathDetails = {
    invalidAvatarFormat: getAvatarFilePath('avatar.GIF'),
    invalidAvatarSize: getAvatarFilePath('hugeAvatar.JPG'),
    firstName: 'invalid',
    lastName: 'invalid',
    spiritualName: 'invalid',
};


export const user2: Member = {
    ...baseMember,
    email: 'userforsangha2@gmail.com'
};
