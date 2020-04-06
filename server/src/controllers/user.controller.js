const log4js = require('log4js');
const formidable = require('formidable');

const log = log4js.getLogger('controllers/user.controller.js');
const { User } = require('../models/user.model');

module.exports.login = (req, res) => {
    const user = req.user;
    res.json({ name: `${user.firstName} ${user.lastName}`, isActive: user.isActive, isSuperuser: user.isSuperuser });
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
    try {
        const users = await User.find({}, 'email isSuperuser firstName lastName');
        res.json(users);
    } catch (err) {
        next(err);
    }
};

module.exports.personal = async (req, res, next) => {
    try {
        const user = await User.find(
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
        res.json(user);
    } catch (err) {
        next(err);
    }
};

module.exports.updateItemAndVisibility = async (req, res, next) => {
    try {
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
    form.parse(req)
        .on('field', (name, field) => {
            log.warn('Fields are invalid in this message type', name, field);
        })
        .on('fileBegin', (name, file) => {
            file.path = '../client/public/images/' + file.name;
        })
        .on('file', (name, file) => {
            log.info(`File: ${file.name}, ${file.size} byte, ${file.type}`);
            res.json({ profileImg: file.name });
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

    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         next(err);
    //         return;
    //     }
    //     log.info(`File: ${files.file.name}, ${files.file.size} byte, ${files.file.type}`);
    //     // log.info(`Path: ${files.file.path}`); // Temporary file to be uploaded...
    //     res.json({ profileImg: files.file.name });
    // });

    // console.log(req.body);
    // res.status(200).send('OK');

    // res.status(500).send({ error: 'Test only' });
    // try {
    //     const user = await User.findOneAndUpdate(
    //         { email: req.user.email },
    //         req.body,
    //         { new: true, useFindAndModify: false }
    //     );
    //     const key = Object.keys(req.body)[0];
    //     res.json({ [key]: user[key] });
    // } catch (err) {
    //     next(err);
    // }
};
