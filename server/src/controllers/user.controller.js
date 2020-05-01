const { SERVER_ROOT } = require('../config');

const log4js = require('log4js');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

const log = log4js.getLogger('controllers/user.controller.js');
const { User } = require('../models/user.model');
const { Member } = require('../models/member.model');
const { RegisteredUser } = require('../models/registered.user.model');
const { Account } = require('../models/financeAccount.model');

module.exports.login = async (req, res, next) => {
    try {
        const registeredUser = await RegisteredUser.find({ email: req.user.email }, 'firstName lastName');
        if (registeredUser.length === 0) { // registeredUser gives empty array if user not found in DB
            log.info(`Following user not register yet: ${req.user.email}`);
            return res.json({ name: 'Unknown', isSuperuser: true });
        }
        res.json({ name: `${registeredUser.firstName} ${registeredUser.lastName}`, isSuperuser: true });
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
            const fileName = 'images/' + uuidv4().slice(-12) + extension;
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

                const account = await Account.create({
                    userId: registration._id,
                    email: req.user.email
                });

                Promise.all([registration, membersUpdate, account])
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

module.exports.listUsers = async (req, res, next) => {
    // FIXME: User should be changed to Member - Ildi
    try {
        const users = await User.find({}, 'email isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin firstName lastName');
        res.json(users);
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
            email emailVisible\
            mobile mobileVisible\
            level levelVisible\
            address addressVisible\
            emName emMobile emEmail emContactVisible'
        );
        res.json(registeredUser);
    } catch (err) {
        next(err);
    }
};

module.exports.updateItemAndVisibility = async (req, res, next) => {
    try {
        // FIXME: User should be changed to Member - Ildi
        const user = await User.findOneAndUpdate(
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
            fileName = 'images/' + uuidv4().slice(-12) + extension;
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
