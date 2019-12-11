const { DB_URL, PORT, DB_NAME, COLL_NAME, SESSION_SECRET, CLIENT_ID } = require('./config');

const uuidv4 = require('uuid/v4');

const log4js = require('log4js');
const log = log4js.getLogger('src/config.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
const GoogleStrategy = require('passport-google').Strategy;

const mongoose = require('mongoose');
const mongourl = DB_URL;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
    const givenName = payload.given_name;
    const familyName = payload.family_name;
    log.info(`Signing in: ${givenName} ${familyName}, ID: ${userid}`);
};

app.use(express.static('app'));
// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:4000/userList',
    realm: 'http://localhost:4000/'
}, (identifier, done) => {
    // in this callback we check the user's credentials in our database based on identifier
    return done(err, user);
}));

app.use(session({
    genid: () => { return uuidv4(); },
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        dbName: DB_NAME
    }),
    cookie: {
        maxAge: 60000,
        secure: true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/userList', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    coll.find({}).toArray().then((data) => { res.json(data); });
});

app.post('/auth', (req, res) => {
    const token = req.body.id_token;
    log.debug(token);
    verify(token)
        .then(() => res.status(200).send('OK'))
        .catch(console.error);
});

let db = null;
let coll = null;

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
