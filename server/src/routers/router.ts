import { Router, Response, NextFunction } from 'express';
import userController from '../controllers/user.controller';
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

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/logout', userController.logout);
router.get('/personal', userController.personal);
router.post('/registereduserdata', userController.registereduserdata);
router.get('/getnameofusers', userController.getNameOfUsers);
router.get('/avatarurl', userController.getUserAvatarURL);
router.put('/saveitem', userController.updateItemAndVisibility);
router.put('/savevisibility', userController.updateItemAndVisibility);
router.post('/uploadprofileimg', userController.uploadProfileImg);

export default router;
