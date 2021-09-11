import { Router, Response, NextFunction } from 'express';
import financeController from '../controllers/finance.controller';
import { financeAdminACL } from './acl';

import log4js from 'log4js';
const log = log4js.getLogger('routers/router.js');

const financeRouter = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
financeRouter.use((req: any, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) { // session cookie has expired ??
        log.info(`[${req.ip}] ${req.method} ${req.url}, ${req.user.email}, authenticated.`);
        next();
    } else {
        log.warn(`[${req.ip}] ${req.method} ${req.url} Request not authenticated, send 403 Forbidden!`);
        res.status(403).send();
    }
});

financeRouter.post('/financedata', financeController.getFinanceData);
financeRouter.post('/addtransaction', financeAdminACL, financeController.addTransaction);
financeRouter.post('/deletetransaction', financeAdminACL, financeController.deleteTransaction);
financeRouter.get('/userlist', financeAdminACL, financeController.getUserList);
financeRouter.post('/exportdata', financeAdminACL, financeController.exportData);

export default financeRouter;
