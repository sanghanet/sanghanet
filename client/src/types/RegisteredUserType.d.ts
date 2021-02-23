type RegisteredUserType = {
    _id: string,
    activeMember: boolean,
    firstName: string,
    lastName: string,
    profileImg: string,
    spiritualName: string,
    birthday?: string | null,
    gender?: GENDER | null,
    level?: LEVEL | null,
    email?: string | null,
    mobile?: string | null,
    address?: string | null,
    emName?: string | null,
    emMobile?: string | null,
    emEmail?: string | null
};
