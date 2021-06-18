import { PORT } from './config';

import log4js from 'log4js';
const log = log4js.getLogger('server.js');

import express from 'express';
const app = express();

import { initDBConnection } from './controllers/mongoDB.controller';

import bodyParser from 'body-parser';
import sessionMiddleware from './controllers/session.controller';

import passport from 'passport';

import authRouter from './routers/auth.router';
import router from './routers/router';
import suRouter from './routers/su.router';
import financeRouter from './routers/financeRouter';
import serviceRouter from './routers/service.router';

app.use(express.static('app'));
app.use('/registration', express.static('app'));
app.use('/loading', express.static('app'));
app.use('/images', express.static('app/images'));
app.use('/images/list', serviceRouter);

app.use('/app/dashboard', express.static('app'));
app.use('/app/personal', express.static('app'));
app.use('/app/yoga', express.static('app'));
app.use('/app/finances', express.static('app'));
app.use('/app/events', express.static('app'));
app.use('/app/members', express.static('app'));
app.use('/app/questions', express.static('app'));
app.use('/app/queries', express.static('app'));

app.use('/admin/finance', express.static('app'));
app.use('/admin/event', express.static('app'));
app.use('/admin/yoga', express.static('app'));
app.use('/admin/superuser', express.static('app'));
app.use('/app/admin/finance', express.static('app')); //   heroku deployment add '/app/' to the URL
app.use('/app/admin/event', express.static('app'));
app.use('/app/admin/yoga', express.static('app'));
app.use('/app/admin/superuser', express.static('app'));

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); // TODO - refactor deprecated bodyParser
app.use(bodyParser.json()); // TODO - refactor deprecated bodyParser

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/user', router);
app.use('/su', suRouter);
app.use('/finance', financeRouter);

const runServer = async () => {
    await initDBConnection();
    app.listen(PORT, async () => {
        log.info('Server is listening on port: ', PORT);
    }).on('error', (error) => {
        log.fatal(error.message);
        log4js.shutdown(() => process.exit());
    });
};

runServer();
