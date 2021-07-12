import { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';
import fs from 'fs';

const log = log4js.getLogger('controllers/service.controller.js');

const list = (req: Request, res: Response, next: NextFunction): void => {
    log.info('Incoming image list request is from: ', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    fs.readdir('./app/images', function (err: NodeJS.ErrnoException | null, files: string[]): void {
        err ? next(err) : res.status(200).send(files.join('\n'));
    });
};

export default list;
