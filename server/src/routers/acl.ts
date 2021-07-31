import { Response, NextFunction } from 'express';

import log4js from 'log4js';
const log = log4js.getLogger('routers/acl.js');

const access = (role: Role) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (req: any, res: Response, next: NextFunction) => {
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
