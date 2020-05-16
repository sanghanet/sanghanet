const { Member } = require('../models/member.model');
// const { Account } = require('../models/financeAccount.model');
// const { RegisteredUser } = require('../models/registered.user.model');
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

module.exports.deleteMember = async (req, res, next) => {
    log.info(`${req.user.email} deleted ${req.body.remove}.`);
    // TODO: if user registered: true then delete it from registereduser and financialaccounts etc. collections
    try {
        const memberToDelete = await Member.findOneAndDelete( // returns whole object if successful
            { email: req.body.remove }
        );
        const msg = memberToDelete ? req.body.remove : null;
        res.json({ deleted: msg });
        // log.fatal(user.registered);
        // const deleteRegistration = (deleteUser.registered) ? await RegisteredUser.findOneAndDelete(
        //     { email: req.body.remove }
        // ) : null;
        // const deleteFinance = (deleteUser.registered) ? await Account.findOneAndDelete(
        //     { email: req.body.remove }
        // ) : null;

        // Promise.all([deleteRegistration, deleteFinance, deleteUser])
        //     .then((results) => {
        //         log.info('Delete successful!');
        //         res.status(200).send('Deleted');
        //     });
        // const members = await Member.find({}, 'email isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin label registered');
        // res.json(members);
    } catch (err) {
        next(err);
        log.error(err);
        res.status(500).send('Delete failed.');
    }
};
