const { Member } = require('../models/member.model');
const { Account } = require('../models/financeAccount.model');
const { RegisteredUser } = require('../models/registered.user.model');
const log4js = require('log4js');
const log = log4js.getLogger('controllers/user.controller.js');

module.exports.listMembers = async (req, res, next) => {
    try {
        const users = await (await Member.find({}, 'email isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin label registered')).reverse();
        res.json(users);
    } catch (err) {
        next(err);
        log.error(err);
    }
};

module.exports.updateMemberRole = async (req, res, next) => {
    log.info(`${req.user.email} is updating ${req.body.update} roles!`);
    try {
        const memberRoleUpdate = await Member.findOneAndUpdate(
            { email: req.body.update },
            {
                isSuperuser: req.body.isSuperuser,
                isFinanceAdmin: req.body.isFinanceAdmin,
                isEventAdmin: req.body.isEventAdmin,
                isYogaAdmin: req.body.isYogaAdmin
            },
            { new: true, useFindAndModify: false } // new: true - returns the object after update was applied
        );

        const msg = memberRoleUpdate
            ? {
                updated: memberRoleUpdate.email,
                isFinance: memberRoleUpdate.isFinanceAdmin,
                isEvent: memberRoleUpdate.isEventAdmin,
                isYoga: memberRoleUpdate.isYogaAdmin,
                isSuperuser: memberRoleUpdate.isSuperuser
            }
            : { updated: null };
        res.json(msg);
        log.info(`Updated user ${msg.updated}: \
${msg.isFinance ? 'Finance, ' : ''} \
${msg.isEvent ? 'Event, ' : ''} \
${msg.isYoga ? 'Yoga, ' : ''} \
${msg.isSuperuser ? 'Superuser' : ''}`
        );
    } catch (err) {
        log.error(err);
        next(err);
    }
};

module.exports.addMember = (req, res, next) => {
    const emailToAdd = req.body.email;
    log.info(`${req.user.email} is trying to add ${emailToAdd}...`);
    const labelToAdd = req.body.label;
    try {
        Member.find({ email: emailToAdd }, (err, docs) => {
            if (err) next(err);
            if (docs.length) { // if address already exists in DB
                res.json({ addedAddress: null, exists: true });
                log.info(`Tried to add ${emailToAdd}, but it already exists in DB.`);
            } else {
                const member = new Member({ email: emailToAdd, label: labelToAdd });
                member.save((err) => {
                    if (err) {
                        res.json({ memberAdded: null, exists: false });
                        log.error(`Couldn't add ${member.label} (${member.email}) \n${err}`);
                    } else {
                        res.json({ memberAdded: member, exists: true });
                        log.info(`${member.label} (${member.email}) added.`);
                    }
                });
            }
        });
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
            Account.findOneAndDelete({ email: req.body.remove })
                .then((userObj) => {
                    log.info(`${req.body.remove}: finance data deleted!`);
                })
                .catch((err) => {
                    log.error(`${req.body.remove}: delete finance data failed: (${err})`);
                });
        }
    } catch (err) {
        log.error(err);
        next(err);
    }
};
