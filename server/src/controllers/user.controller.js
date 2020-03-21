const log4js = require('log4js');
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
            'firstName lastName birthday gender email mobile spiritualName level address emName emMobile emEmail'
        );
        res.json(user);
    } catch (err) {
        next(err);
    }
};
