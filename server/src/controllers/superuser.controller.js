const { Member } = require('../models/member.model');
const { Account } = require('../models/financeAccount.model');
const { RegisteredUser } = require('../models/registered.user.model');
const log4js = require('log4js');
const log = log4js.getLogger('controllers/user.controller.js');

module.exports.listMembers = async (req, res, next) => {
    try {
        const users = await Member.find({}, 'email isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin label registered');
        res.json(users);
    } catch (err) {
        next(err);
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

        const msg = memberRoleUpdate ? req.body.update : null;
        res.json({ updated: msg }); // SU page
        log.info(`Updated: ${msg}`);
    } catch (err) {
        log.error(err);
        next(err);
    }
    // TODO: give back also these:
    // const msg = memberRoleUpdate
    //     ? {
    //         updated: memberRoleUpdate.email,
    //         isSu: memberRoleUpdate.isSuperuser,
    //         isFin: memberRoleUpdate.isFinanceAdmin,
    //         isEvent: memberRoleUpdate.isEventAdmin,
    //         isYoga: memberRoleUpdate.isYogaAdmin
    //     }
    //     : { updated: null };
};

module.exports.deleteMember = async (req, res, next) => {
    log.info(`${req.user.email} is deleting ${req.body.remove}.`);
    try {
        const memberToDelete = await Member.findOneAndDelete( // returns whole object if successful or null
            { email: req.body.remove }
        );
        const msg = memberToDelete ? req.body.remove : null;
        res.json({ deleted: msg }); // SU page
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
