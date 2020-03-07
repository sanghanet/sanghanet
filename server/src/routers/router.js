const express = require('express');
const router = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/router.js');

const userController = require('../controllers/user.controller');

router.use((req, res, next) => {
    if (!req.user) { // session cookie has expired
        res.redirect('/');
    } else {
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}`);
        next();
    }
});

router.post('/user/login', userController.login);
router.get('/user/logout', userController.logout);

module.exports = router;
