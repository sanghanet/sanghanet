const express = require('express');
const router = express.Router();

// const log4js = require('log4js');
// const log = log4js.getLogger('routers/routes.js');

const userController = require('../controllers/user.controller');

router.use((req, res, next) => {
    // this can be uncommented once ticket #45 is solved, as well as the log variable
    // log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}`);
    next();
});

router.post('/user/login', userController.login);
router.get('/user/logout', userController.logout);
router.post('/userlist', userController.userList);

module.exports = router;
