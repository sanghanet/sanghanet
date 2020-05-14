const { Member } = require('../models/member.model');
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
    // TODO: if user registered:true then delete it from registereduser and financialaccounts etc. collections
    try {
        const member = await Member.findOneAndDelete(
            { email: req.body.remove }
        );
        log.fatal(member); // registered: false
        res.status(200).send('OK');
    } catch (err) {
        next(err);
    }
};
