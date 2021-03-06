const { Member } = require('../models/member.model');
const { FinanceAccount } = require('../models/financeAccount.model');
const { RegisteredUser } = require('../models/registered.user.model');
const log4js = require('log4js');
const log = log4js.getLogger('controllers/superuser.controller.js');

module.exports.getMemberData = async (req, res, next) => {
    try {
        const membersData = (await Member.find({}, req.fields ? req.fields.join(' ') : null)).reverse();
        res.json(membersData);
    } catch (err) {
        next(err);
        log.error(err);
    }
};

module.exports.getUserData = async (req, res, next) => {
    try {
        const userData = await Member.find({}, req.fields ? req.fields.join(' ') : null);
        res.json(userData);
    } catch (err) {
        next(err);
        log.error(err);
    }
};

module.exports.updateMember = async (req, res, next) => {
    log.info(`${req.user.email} is updating ${req.body.update} roles!`);
    try {
        const memberRoleUpdate = await Member.findOneAndUpdate(
            { email: req.body.update },
            {
                isSuperuser: req.body.isSuperuser,
                isFinanceAdmin: req.body.isFinanceAdmin,
                isEventAdmin: req.body.isEventAdmin,
                isYogaAdmin: req.body.isYogaAdmin,
                level: req.body.level
            },
            { new: true, useFindAndModify: false } // new: true - returns the object after update was applied
        );

        const msg = memberRoleUpdate
            ? {
                updated: memberRoleUpdate.email,
                isFinance: memberRoleUpdate.isFinanceAdmin,
                isEvent: memberRoleUpdate.isEventAdmin,
                isYoga: memberRoleUpdate.isYogaAdmin,
                isSuperuser: memberRoleUpdate.isSuperuser,
                level: memberRoleUpdate.level
            }
            : { updated: null };
        res.json(msg);

        // fancy trick for well-formatted log message
        log.info(
            [
                `Updated user ${msg.updated}: `,
                `${msg.isFinance ? 'Finance, ' : ''}`,
                `${msg.isEvent ? 'Event, ' : ''}`,
                `${msg.isYoga ? 'Yoga, ' : ''}`,
                `${msg.isSuperuser ? 'Superuser' : ''}`,
                `${msg.level ? 'Level' : ''}`
            ].join('')
        );
    } catch (err) {
        log.error(err);
        next(err);
    }
};

module.exports.addMember = async (req, res, next) => {
    const emailToAdd = req.body.email;
    log.info(`${req.user.email} is trying to add ${emailToAdd}...`);
    const labelToAdd = req.body.label;

    try {
        const member = await Member.find({ email: emailToAdd });
        if (member.length > 0) { // if address already exists in DB
            log.info(`Tried to add ${emailToAdd}, but it already exists in DB.`);
            return res.json({ addedAddress: null, exists: true });
        }
        const newMember = await Member.create({ label: labelToAdd, email: emailToAdd, level: '' });
        const newAccount = await FinanceAccount.create({ email: emailToAdd, userName: labelToAdd });
        if (newMember && newAccount) {
            log.info(`${newMember.label} (${newMember.email}) added.`);
            res.json({ memberAdded: newMember, exists: true });
        } else {
            log.error(`Couldn't add ${newMember.label} (${newMember.email})`);
            res.json({ memberAdded: null, exists: false });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteMember = async (req, res, next) => {
    log.info(`${req.user.email} is deleting ${req.body.remove}.`);
    try {
        const memberToDelete = await Member.findOneAndDelete( // returns whole object if successful or null
            { email: req.body.remove }
        );
        FinanceAccount.findOneAndDelete({ email: req.body.remove })
            .then((userObj) => {
                log.info(`${req.body.remove}: finance data deleted!`);
            })
            .catch((err) => {
                log.error(`${req.body.remove}: delete finance data failed: (${err})`);
            });
        const msg = memberToDelete ? req.body.remove : null;
        res.json({ deleted: msg });
        log.info(`Deleted: ${msg}`);

        if (memberToDelete && memberToDelete.registered) {
            log.info(`${req.body.remove}: deleting registration and finance.`);

            RegisteredUser.findOneAndDelete({ email: req.body.remove })
                .then((userObj) => {
                    log.info(`${req.body.remove}: registration deleted!`);
                })
                .catch((err) => {
                    log.error(`${req.body.remove}: delete registration failed: (${err})`);
                });
        }
    } catch (err) {
        log.error(err);
        next(err);
    }
};
