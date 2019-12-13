const { DB_URL, PORT, DB_NAME, COLL_NAME, CLIENT_ID } = require('./config');

const log4js = require('log4js');
const log = log4js.getLogger('src/config.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const mongourl = DB_URL;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify (token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
    const givenName = payload.given_name;
    const familyName = payload.family_name;
    log.info(`Signing in: ${givenName} ${familyName}, ID: ${userid}`);
}

app.use(express.static('app'));
// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
