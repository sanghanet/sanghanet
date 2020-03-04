const log4js = require('log4js');
const log = log4js.getLogger('controllers/user.controller.js');

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
