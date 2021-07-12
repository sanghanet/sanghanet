import { APP_PORT } from '../config';
import passport from '../controllers/passport.controller';
import { Request, Response, NextFunction, Router } from 'express';
import log4js from 'log4js';

const log = log4js.getLogger('routers/auth.router.js');
const authRouter = Router();

authRouter.use((req: Request, res: Response, next: NextFunction) => {
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
    (req: Request, res: Response) => { res.redirect(`http://localhost:${APP_PORT}/loading`); } // TODO - what are these hardcoded localhost urls
);

export default authRouter;
