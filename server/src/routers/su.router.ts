import { Router, Response, NextFunction } from 'express';
import superuserController from '../controllers/superuser.controller';
import { superuserACL } from './acl';

import log4js from 'log4js';
const log = log4js.getLogger('routers/su.router.js');

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

router.post('/getmemberdata', superuserACL, superuserController.getMemberData);
router.post('/getuserdata', superuserACL, superuserController.getUserData);
router.delete('/deletemember', superuserACL, superuserController.deleteMember);
router.post('/addmember', superuserACL, superuserController.addMember);
router.put('/updatemember', superuserACL, superuserController.updateMember);

export default router;
