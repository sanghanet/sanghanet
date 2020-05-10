const { Member } = require('../models/member.model');

module.exports.listMembers = async (req, res, next) => {
    try {
        const users = await Member.find({}, 'email isSuperuser isFinanceAdmin isEventAdmin isYogaAdmin label registered');
        res.json(users);
    } catch (err) {
        next(err);
    }
};
