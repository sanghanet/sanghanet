const { APP_PORT, PORT, CLIENT_ID, CLIENT_SECRET } = require('./config');

const log4js = require('log4js');
const log = log4js.getLogger('server.js');

const express = require('express');
const app = express();

const { initDBConnection, mongoose } = require('./controllers/mongoDB.controller');
const { User } = require('./models/user.model');

const bodyParser = require('body-parser');
const sessionMiddleware = require('./controllers/session.controller');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.serializeUser((userID, done) => {
    log.info(`serialize ${userID}`);
    done(null, userID);
});

passport.deserializeUser((userID, done) => {
    log.info(`deserialize ${userID}`);
    User.findOne({ _id: mongoose.Types.ObjectId(userID) })
        .then((identifiedUserObject) => {
            if (!identifiedUserObject) {
                log.info('deserialization failed');
                done(null, null);
            } else {
                log.info(`deserialized user as: ${identifiedUserObject.email}`);
                done(null, identifiedUserObject);
            }
            done(null, null);
        });
});

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/auth/passport`
}, (identifier, refreshtoken, profile, done) => {
    log.info(profile);
    User.findOne({ email: profile.emails[0].value })
        .then((userObject) => {
            log.info(userObject);
            return userObject && userObject.isActive
                ? done(null, userObject._id)
                : done(null, null);
        }); // catch to handle DB errors with return done(err) ??
}));

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// Email is enough, because we use our custom profile data.
app.post('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/passport',
    passport.authenticate('google', { failureRedirect: `http://localhost:${APP_PORT}/loginfailed` }),
    (req, res) => { res.redirect(`http://localhost:${APP_PORT}/loading`); }
);

app.use('/', router);

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
