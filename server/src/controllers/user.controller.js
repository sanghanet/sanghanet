const { SERVER_ROOT } = require('../config');

const log4js = require('log4js');
const log = log4js.getLogger('controllers/user.controller.js');

const formidable = require('formidable');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

const { Member } = require('../models/member.model');
const { RegisteredUser } = require('../models/registered.user.model');
const { FinanceAccount } = require('../models/financeAccount.model');

module.exports.login = async (req, res, next) => {
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

module.exports.registration = async (req, res, next) => {
    log.info('Registration started.');
    const form = formidable.IncomingForm({ multiples: true });
    const dataToStore = {};
    form.parse(req)
        .on('field', (name, field) => {
            log.warn('Field:', name, field);
            dataToStore[name] = field;
        })
        .on('fileBegin', (name, file) => {
            let extension = '';
            if (file.name.endsWith('.png')) {
                extension = '.png';
            } else if (file.name.endsWith('.jpg')) {
                extension = '.jpg';
            } else if (file.name.endsWith('.jpeg')) {
                extension = '.jpeg';
            } else if (file.name.endsWith('.svg')) {
                extension = '.svg';
            } else if (file.name.endsWith('.webp')) {
                extension = '.webp';
            }
            const fileName = '/images/' + uuidv4().slice(-12) + extension;
            file.path = SERVER_ROOT + fileName;
            dataToStore.profileImg = fileName;
        })
        .on('file', async (name, file) => {
            log.info(`File: ${file.name}, ${file.size} byte, ${file.type}`);
            log.info(`User new profile image is: ${dataToStore.profileImg}`);
        })
        .on('aborted', () => {
            log.info('Request aborted by the user');
            res.status(500).send({ error: 'Request Aborted.' });
        })
        .on('error', (err) => {
            next(err);
        })
        .on('end', async () => {
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

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            log.error(`Session deletion failed: ${err}`);
            res.status(500).send();
        }
    });
    res.status(200).send('OK');
};

module.exports.getNameOfUsers = async (req, res, next) => {
    try {
        const users = await RegisteredUser.find({}, 'firstName lastName spiritualName');
        res.json(users);
    } catch (err) {
        next(err);
    }
};

module.exports.getUserAvatarURL = async (req, res, next) => {
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

module.exports.personal = async (req, res, next) => {
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

module.exports.updateItemAndVisibility = async (req, res, next) => {
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

module.exports.uploadProfileImg = async (req, res, next) => {
    const form = formidable.IncomingForm({ multiples: false });
    let fileName = '';
    form.parse(req)
        .on('field', (name, field) => {
            log.warn('Fields are invalid at this URL.', name, field);
        })
        .on('fileBegin', (name, file) => {
            let extension = '';
            if (file.name.endsWith('.png')) {
                extension = '.png';
            } else if (file.name.endsWith('.jpg')) {
                extension = '.jpg';
            } else if (file.name.endsWith('.jpeg')) {
                extension = '.jpeg';
            } else if (file.name.endsWith('.svg')) {
                extension = '.svg';
            } else if (file.name.endsWith('.webp')) {
                extension = '.webp';
            }
            fileName = '/images/' + uuidv4().slice(-12) + extension;
            file.path = SERVER_ROOT + fileName;
        })
        .on('file', async (name, file) => {
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
                    fs.unlink(removeFile, (err) => {
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
        })
        .on('aborted', () => {
            log.info('Request aborted by the user');
            res.status(500).send({ error: 'Request Aborted.' });
        })
        .on('error', (err) => {
            next(err);
        })
        .on('end', () => {
            log.info('Upload successful.');
        });
};

module.exports.registereduserdata = async (req, res, next) => {
    log.info('All registered users fetched by:', req.user.email);
    try {
        const ids = req.body.userIDs;
        const registeredUsers = await RegisteredUser.find(ids ? { _id: { $in: ids } } : {});
        const level = await Member.find(req.body.userId ? { _id: { $in: req.body.userIDs } } : {}, 'level email');
        const visibleUserData = registeredUsers.map((registeredUser) => {
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
                level: level.find(person => person.email === registeredUser.email).level,
                mobile: registeredUser.mobileVisible ? registeredUser.mobile : null
            };
        });
        res.json(visibleUserData);
    } catch (err) {
        next(err);
        log.error(err);
    }
};
