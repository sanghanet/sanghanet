const { APP_PORT } = require('../config');

const express = require('express');
const authRouter = express.Router();

const log4js = require('log4js');
const log = log4js.getLogger('routers/auth.router.js');

const passport = require('../controllers/passport.controller');

authRouter.use((req, res, next) => {
    if (req.user) { // If browser already has a session ID, like user opened a new TAB to login again
        log.info(`[${req.ip}] ${req.method} ${req.url} user already authenticated`);
        res.redirect(`http://localhost:${APP_PORT}/loading`); // TODO - what are these hardcoded localhost urls
    } else {
        log.info(`[${req.ip}] ${req.method} ${req.url}`);
        next();
    }
});

authRouter.post('/google', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/passport',
    passport.authenticate('google', { failureRedirect: `http://localhost:${APP_PORT}/throwout/authenticationfailed` }), // TODO - what are these hardcoded localhost urls
    (req, res) => { res.redirect(`http://localhost:${APP_PORT}/loading`); } // TODO - what are these hardcoded localhost urls
);

module.exports = authRouter;
