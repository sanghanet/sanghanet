const log4js = require('log4js');
const log = log4js.getLogger('routers/acl.js');

const access = (role) => {
    return (req, res, next) => {
        if (req.user[role]) {
            log.info(`${req.user.email} ${role}: access granted.`);
            next();
        } else {
            log.warn(`${req.user.email} ${role}=false: access denied!`);
            res.status(403).send('Unauthorized access!');
        }
    };
};

module.exports.superuser = access('isSuperuser'); // define router only once
module.exports.financeAdmin = access('isFinanceAdmin');
module.exports.eventAdmin = access('isEventAdmin');
module.exports.yogaAdmin = access('isYogaAdmin');
