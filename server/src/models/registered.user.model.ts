import { Schema, model } from 'mongoose';
import { IRegisteredUser } from '../interfaces/RegisteredUser';

const RegisteredUserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: { type: String, required: true },
    email: { type: String, required: true },
    emailVisible: { type: Boolean, default: false },
    gender: { type: String, default: '' },
    genderVisible: { type: Boolean, default: false },
    // level in member model
    levelVisible: { type: Boolean, default: false },
    mobile: { type: String, default: '' },
    mobileVisible: { type: Boolean, default: false },
    birthday: { type: String, default: '' },
    birthdayVisible: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    lastLogin: { type: Date, default: Date.now() },
    spiritualName: { type: String, required: true },
    address: { type: String, default: '' },
    addressVisible: { type: Boolean, default: false },
    emName: { type: String, default: '' },
    emMobile: { type: String, default: '' },
    emEmail: { type: String, default: '' },
    emContactVisible: { type: Boolean, default: false }
});

const RegisteredUser = model<IRegisteredUser>('RegisteredUser', RegisteredUserSchema);

export default RegisteredUser;
