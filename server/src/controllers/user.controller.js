const log4js = require('log4js');
const log = log4js.getLogger('controllers/user.controller.js');
const { User } = require('../models/user.model');

module.exports.login = (req, res) => {
    const user = req.user;
    log.info(req.ip, user);
    res.json({ name: `${user.firstName} ${user.lastName}`, isActive: user.isActive, isSuperuser: user.isSuperuser });
};

module.exports.logout = (req, res) => {
    log.info(req.session);
    req.session.destroy((err) => {
        if (err) {
            log.error(`Session deletion failed: ${err}`);
            res.status(500).send();
        }
    });
    res.status(200).send();
};

module.exports.userList = (req, res) => {
    // res.set({ 'Access-Control-Allow-Origin': '*' });
    User.find({}, 'email isActive isSuperuser')
        .then((userList) => {
            res.json(userList);
        })
        .catch((error) => {
            log.error(error);
            res.status(500).send();
        });
};
