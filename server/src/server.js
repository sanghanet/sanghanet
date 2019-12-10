const { DB_URL, PORT } = require('./config');

const log4js = require('log4js');
const log = log4js.getLogger('src/config.js');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongourl = DB_URL;

app.use(express.static('app'));

app.get('/api/members', function (req, res) {
    res.send('Hello World!');
});

const runServer = async () => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
        log.info('Successfully connected to MongoDB database.');
        app.listen(PORT, () => {
            log.info('Server is listening on port: ', PORT);
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
