const express = require('express');
const router = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/su.router.js');

const superuserController = require('../controllers/superuser.controller');
const acl = require('./acl');

router.use((req, res, next) => {
    if (req.isAuthenticated()) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

router.post('/listmembers', acl.superuser, superuserController.listMembers);
router.delete('/deletemember', acl.superuser, superuserController.deleteMember);
router.post('/addmember', acl.superuser, superuserController.addMember);
router.put('/updatemember', acl.superuser, superuserController.updateMember);

module.exports = router;
