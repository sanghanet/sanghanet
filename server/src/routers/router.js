const express = require('express');
const router = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/router.js');

const userController = require('../controllers/user.controller');

router.use((req, res, next) => {
    if (req.isAuthenticated()) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/listusers', userController.listUsers);
router.get('/personal', userController.personal);
router.put('/saveitem', userController.updateItemAndVisibility);
router.put('/savevisibility', userController.updateItemAndVisibility);
router.post('/uploadprofileimg', userController.uploadProfileImg);

module.exports = router;
