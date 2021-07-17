import { SERVER_ROOT } from '../config';

import { Request, Response, NextFunction } from 'express';

import { IncomingForm } from 'formidable';

import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';

import Member from '../models/member.model';
import RegisteredUser from '../models/registered.user.model';
import FinanceAccount from '../models/financeAccount.model';

import log4js from 'log4js';
const log = log4js.getLogger('controllers/user.controller.js');

const renameFile = (fileName: string | null) => {
    if (fileName) {
        const extension = fileName.match(/\.(|jpg|jpeg|png|svg|webp)$/i) ? fileName.substring(fileName.lastIndexOf('.')).toLowerCase() : '';
        return '/images/' + uuidv4().slice(-12) + extension;
    }
    return 'imageUploadError.jpg';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const registeredUser = await RegisteredUser.find({ email: req.user.email }, 'firstName lastName');
        if (registeredUser.length === 0) { // registeredUser gives empty array if user not found in DB
            log.info(`Following user not register yet: ${req.user.email}`);
            return res.json({ status: 'unregistered' });
        }
        res.json({ status: 'registered' });
    } catch (err) {
        next(err);
    }
};

type DataToStore = {
    [key: string]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registration = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    log.info('Registration started.');
    const form = new IncomingForm({ multiples: true });
    const dataToStore: DataToStore = {};

    form.parse(req, (err, fields, files) => {
        if (err) {
            log.error(err, fields, files);
            next();
        } else {
            log.info('Image upload parse successful.');
        }
    });
    form.on('field', (name, field) => {
        log.warn('Field:', name, field);
        dataToStore[name] = field;
    });
    form.on('fileBegin', (name, file) => {
        const fileName = renameFile(file.name);
        file.path = SERVER_ROOT + fileName;
        dataToStore.profileImg = fileName;
    });
    form.on('file', async (name, file) => {
        log.info(`File: ${file.name}, ${file.size} byte, ${file.type}`);
        log.info(`User new profile image is: ${dataToStore.profileImg}`);
    });
    form.on('aborted', () => {
        log.info('Request aborted by the user');
        res.status(500).send({ error: 'Request Aborted.' });
    });
    form.on('error', (err) => {
        next(err);
    });
    form.on('end', async () => {
        log.info('Upload successful.');
        try {
            const registration = await RegisteredUser.create({
                firstName: dataToStore.firstName,
                lastName: dataToStore.lastName,
                profileImg: dataToStore.profileImg,
                email: req.user.email,
                spiritualName: dataToStore.spiritualName
            });

            const membersUpdate = await Member.findOneAndUpdate(
                { email: req.user.email },
                { registered: true },
                { useFindAndModify: false }
            );

            const accountUpdate = await FinanceAccount.findOneAndUpdate(
                { email: req.user.email },
                { userId: registration._id },
                { useFindAndModify: false }
            );

            Promise.all([registration, membersUpdate, accountUpdate])
                .then((results) => {
                    log.info('Registration successful!');
                    res.status(201).send('Created');
                });
        } catch (error) {
            log.error(error);
            res.status(500).send('Creation failed');
        }
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logout = (req: any, res: Response): void => {
    req.session.destroy((err: Error) => {
        if (err) {
            log.error(`Session deletion failed: ${err}`);
            res.status(500).send();
        }
    });
    res.status(200).send('OK');
};

const getNameOfUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await RegisteredUser.find({}, 'firstName lastName spiritualName');
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserAvatarURL = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const avatarURL = await RegisteredUser.find(
            { email: req.user.email },
            'profileImg'
        );
        res.json(avatarURL);
    } catch (err) {
        next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const personal = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const registeredUser = await RegisteredUser.find(
            { email: req.user.email },
            // eslint-disable-next-line no-multi-str
            'firstName lastName\
            profileImg spiritualName\
            birthday birthdayVisible\
            gender genderVisible\
            levelVisible\
            email emailVisible\
            mobile mobileVisible\
            address addressVisible\
            emName emMobile emEmail emContactVisible'
        );
        const access = await Member.find(
            { email: req.user.email },
            'isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin level'
        );
        res.json([registeredUser[0], access[0]]);
    } catch (err) {
        next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateItemAndVisibility = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await RegisteredUser.findOneAndUpdate(
            { email: req.user.email },
            req.body,
            { new: true, useFindAndModify: false }
        );
        const key = Object.keys(req.body)[0];
        res.json({ [key]: user[key] });
    } catch (err) {
        next(err);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadProfileImg = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const form = new IncomingForm({ multiples: false });
    let fileName = '';

    form.parse(req, (err, fields, files) => {
        if (err) {
            log.error(err, fields, files);
            next();
        } else {
            log.info('Image upload parse successful.');
        }
    });
    form.on('field', (name, field) => {
        log.warn('Fields are invalid at this URL.', name, field);
    });
    form.on('fileBegin', (name, file) => {
        fileName = renameFile(file.name);
        file.path = SERVER_ROOT + fileName;
    });
    form.on('file', async (name, file) => {
        log.info(`File: ${file.name}, ${file.size} byte, ${file.type}`);
        try {
            const user = await RegisteredUser.findOneAndUpdate(
                { email: req.user.email },
                { profileImg: fileName },
                { useFindAndModify: false }
            );
            res.json({ profileImg: fileName });
            log.info(`User new profile image is: ${fileName}`);
            const removeFile = SERVER_ROOT + user.profileImg; // former profile img
            if (user.profileImg) {
                fs.unlink(removeFile, (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                        log.warn(`Failed to delete profile image: ${removeFile}`);
                        return;
                    }
                    log.info(`Removed profile image: ${removeFile}`);
                });
            }
        } catch (err) {
            next(err);
        }
    });
    form.on('aborted', () => {
        log.info('Request aborted by the user');
        res.status(500).send({ error: 'Request Aborted.' });
    });
    form.on('error', (err: Error) => {
        next(err);
    });
    form.on('end', () => {
        log.info('Upload successful.');
    });
};

type MemberLevel = {
    _id: string,
    level: string,
    email: string
};

const findMemberLevel = (membersLevel: Array<MemberLevel>, registeredUser: RegisteredUser): string => {
    if (membersLevel.length) {
        const member = membersLevel.find((memberLevel) => memberLevel.email === registeredUser.email);
        if (member) { return member.level; }
    }
    return '-';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registereduserdata = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    log.info('All registered users fetched by:', req.user.email);
    try {
        const ids = req.body.userIDs;
        const registeredUsers = await RegisteredUser.find(ids ? { _id: { $in: ids } } : {});
        const membersLevel: Array<MemberLevel> = await Member.find(req.body.userId ? { _id: { $in: req.body.userIDs } } : {}, 'level email');
        log.fatal(membersLevel);
        const visibleUserData = registeredUsers.map((registeredUser: RegisteredUser) => {
            return {
                _id: registeredUser._id,
                activeMember: req.user.email === registeredUser.email,
                profileImg: registeredUser.profileImg,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                spiritualName: registeredUser.spiritualName,
                email: registeredUser.emailVisible ? registeredUser.email : null,
                address: registeredUser.addressVisible ? registeredUser.address : null,
                birthday: registeredUser.birthdayVisible ? registeredUser.birthday : null,
                emEmail: registeredUser.emContactVisible ? registeredUser.emEmail : null,
                emMobile: registeredUser.emContactVisible ? registeredUser.emMobile : null,
                emName: registeredUser.emContactVisible ? registeredUser.emName : null,
                gender: registeredUser.genderVisible ? registeredUser.gender : null,
                level: findMemberLevel(membersLevel, registeredUser),
                mobile: registeredUser.mobileVisible ? registeredUser.mobile : null
            };
        });
        res.json(visibleUserData);
    } catch (err) {
        next(err);
        log.error(err);
    }
};

export {
    login,
    registration,
    logout,
    getNameOfUsers,
    getUserAvatarURL,
    personal,
    updateItemAndVisibility,
    uploadProfileImg,
    registereduserdata
};
