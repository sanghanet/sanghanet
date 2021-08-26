import { Document } from 'mongoose';

export interface IRegisteredUser extends Document {
    firstName: string,
    lastName: string,
    profileImg: string,
    email: string,
    emailVisible: boolean,
    gender: string,
    genderVisible: boolean,
    // level in member model
    levelVisible: boolean,
    mobile: string,
    mobileVisible: boolean,
    birthday: string,
    birthdayVisible: boolean,
    createdAt: Date,
    lastLogin: Date,
    spiritualName: string,
    address: string,
    addressVisible: boolean,
    emName: string,
    emMobile: string,
    emEmail: string,
    emContactVisible: boolean
}
