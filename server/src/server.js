const { DB_URL, PORT, DB_NAME, COLL_NAME } = require('./config');

const log4js = require('log4js');
const log = log4js.getLogger('src/config.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const mongourl = DB_URL;

app.use(express.static('app'));
// configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/userList', (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' });
    coll.find({}).toArray().then((data) => { res.json(data); });
});

app.post('/auth', (req, res) => {
    log.warn(req.body);
    res.status(200).send('OK');
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
