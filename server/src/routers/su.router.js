const express = require('express');
const router = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/su.router.js');

const superuserController = require('../controllers/superuser.controller');

router.use((req, res, next) => {
    if (req.isAuthenticated() && req.user.isSuperuser) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

router.post('/listmembers', superuserController.listMembers);
router.delete('/deletemembers', superuserController.deleteMember);

module.exports = router;
