import { Router, Response, NextFunction } from 'express';
import {
    login,
    registration,
    logout,
    personal,
    registereduserdata,
    getNameOfUsers,
    getUserAvatarURL,
    updateItemAndVisibility,
    uploadProfileImg
} from '../controllers/user.controller';

import log4js from 'log4js';
const log = log4js.getLogger('routers/router.js');

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.use((req: any, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

router.post('/login', login);
router.post('/registration', registration);
router.get('/logout', logout);
router.get('/personal', personal);
router.post('/registereduserdata', registereduserdata);
router.get('/getnameofusers', getNameOfUsers);
router.get('/avatarurl', getUserAvatarURL);
router.put('/saveitem', updateItemAndVisibility);
router.put('/savevisibility', updateItemAndVisibility);
router.post('/uploadprofileimg', uploadProfileImg);

export default router;
