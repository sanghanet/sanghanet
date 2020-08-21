const { PORT } = require('./config');

const log4js = require('log4js');
const log = log4js.getLogger('server.js');

const express = require('express');
const app = express();

const { initDBConnection } = require('./controllers/mongoDB.controller');

const bodyParser = require('body-parser');
const sessionMiddleware = require('./controllers/session.controller');

const passport = require('passport');

const authRouter = require('./routers/auth.router');
const router = require('./routers/router');
const suRouter = require('./routers/su.router');
const financeRouter = require('./routers/financeRouter');

app.use(express.static('app'));
app.use('/registration', express.static('app'));
app.use('/loading', express.static('app'));
app.use('/images', express.static('app/images'));

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
app.use('/app/admin/finance', express.static('app')); //deploymen add /app/ to the URL
app.use('/app/admin/event', express.static('app'));
app.use('/app/admin/yoga', express.static('app'));
app.use('/app/admin/superuser', express.static('app'));

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        log4js.shutdown(process.exit);
    });
};

runServer();
