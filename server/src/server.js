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

app.use(express.static('app'));
app.use('/loading', express.static('app'));
app.use('/dashboard', express.static('app'));
app.use('/personal', express.static('app'));
app.use('/finances', express.static('app'));
app.use('/queries', express.static('app'));
app.use('/superuser', express.static('app'));

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/user', router);

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
