const express = require('express');
const financeRouter = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/router.js');

const financeController = require('../controllers/finance.controller');

financeRouter.use((req, res, next) => {
    if (req.isAuthenticated()) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

financeRouter.get('/financedata', financeController.getFinanceData);

module.exports = financeRouter;
