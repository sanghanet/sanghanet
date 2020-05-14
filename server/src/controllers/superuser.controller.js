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
    log.fatal();
    // try {
    //     await Member.findOneAndRemove(
    //         { email: req.user.email }
    //     );
    //     res.json();
    // } catch (err) {
    //     next(err);
    // }
};
