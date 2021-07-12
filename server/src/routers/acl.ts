import { Request, Response, NextFunction } from 'express';

import log4js from 'log4js';
const log = log4js.getLogger('routers/acl.js');

interface ExtendedRequest extends Request{
    user: Member
}

const access = (role: Role) => {
    return (req: ExtendedRequest, res: Response, next: NextFunction) => {
        log.fatal(req.user);
        if (req.user[role]) {
            log.info(`${req.user.email} ${role}: access granted.`);
            next();
        } else {
            log.warn(`${req.user.email} ${role}=false: access denied!`);
            res.status(403).send('Unauthorized access!');
        }
    };
};

const superuserACL = access('isSuperuser'); // define router only once
const financeAdminACL = access('isFinanceAdmin');
const eventAdminACL = access('isEventAdmin');
const yogaAdminACL = access('isYogaAdmin');

export {
    superuserACL,
    financeAdminACL,
    eventAdminACL,
    yogaAdminACL
};
