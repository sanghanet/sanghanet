const { APP_PORT, DB_URL, PORT, DB_NAME, COLL_NAME, SESSION_SECRET, CLIENT_ID, CLIENT_SECRET } = require('./config');

const uuidv4 = require('uuid/v4');

const log4js = require('log4js');
const log = log4js.getLogger('src/server.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const mongourl = DB_URL;

let db = null;
let coll = null;

app.use(express.static('app'));
app.use('/loading', express.static('app'));
app.use('/dashboard', express.static('app'));
app.use('/personal', express.static('app'));
app.use('/finances', express.static('app'));
app.use('/queries', express.static('app'));

// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.serializeUser((user, done) => {
    log.info(`serialize ${user._id}`);
    done(null, user._id);
});

passport.deserializeUser((user, done) => {
    log.info(`deserialize ${user}`);
    coll.find({ _id: ObjectId(user) }).toArray()
        .then((result) => {
            const identifiedUserObject = result[0];
            if (!identifiedUserObject) {
                log.info('deserialization failed');
                done(null, null);
            } else {
                log.info(`deserialized user as: ${identifiedUserObject.firstName} ${identifiedUserObject.lastName}`);
                done(null, identifiedUserObject);
            }
            done(null, null);
        });
});

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/passport`
}, (identifier, refreshtoken, profile, done) => {
    log.info(profile.emails);
    coll.find({ email: profile.emails[0].value }).toArray()
        .then((result) => {
            const userObject = result[0];
            log.info(result);
            if (!userObject) {
                return done(null, null);
            } else if (userObject.isActive) {
                return done(null, userObject);
            }
            return done(null, null);
        });
}));

app.use(session({
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        dbName: DB_NAME
    }),
    cookie: {
        maxAge: 120000,
        secure: false
    },
    name: 'Sanghanet.backend',
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/userList', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    coll.find({}).toArray().then((data) => { res.json(data); });
});

app.post('/auth',
    passport.authenticate(
        'google',
        { scope: ['profile', 'email'] }
    )
);

app.get('/passport', (req, res, next) => {
    passport.authenticate(
        'google',
        (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else if (!user) {
                res.redirect('/');
            } else if (user) {
                req.logIn(user, (err) => { res.status(500).send(err); });
                res.redirect(`http://localhost:${APP_PORT}/loading`);
            }
        }
    )(req, res, next);
});

app.post('/api/user', (req, res) => {
    const user = req.user;
    log.info(req.ip, user);
    res.json({ name: `${user.firstName} ${user.lastName}`, isActive: user.isActive, isAdmin: user.isAdmin });
});

app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            log.info(`Session deletion failed: ${err}`);
            res.status(500).send();
        }
    });
    res.status(200).send();
});

const runServer = async () => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
        log.info('Successfully connected to MongoDB database.');
        app.listen(PORT, () => {
            log.info('Server is listening on port: ', PORT);
            db = mongoose.connection.client.db(DB_NAME);
            coll = db.collection(COLL_NAME);
        }).on('error', (error) => {
            log.fatal(error.message);
            log4js.shutdown(process.exit);
        });
    } catch (error) {
        log.fatal('Database connection error: ' + error.message);
        log4js.shutdown(process.exit);
    }
};

runServer();
