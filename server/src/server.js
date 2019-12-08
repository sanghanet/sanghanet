const { DB_URL, PORT } = require('./config');
const { logManager, closeLogger, FILENAME_MAX_LENGTH } = require('./logManager');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongourl = DB_URL;

const log = logManager.createLogger('src/server.js'.padEnd(FILENAME_MAX_LENGTH));

app.use(express.static('app'));

app.get('/api/members', function (req, res) {
    res.send('Hello World!');
});

const runServer = async () => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                const db = mongoose.connection.client.db('sanghanet');
                return db;
            }).then((db) => {
                const coll = db.collection('users');
                return coll.find({}).toArray();
            }).then((res) => {
                console.log(res);
            });
        log.info('Successfully connected to MongoDB database.');
        if (PORT) {
            app.listen(PORT, () => {
                log.info('Server is listening on port: ', PORT);
            }).on('error', (error) => {
                log.fatal(error.message);
                closeLogger().then(process.exit);
            });
        } else {
            log.fatal('Missing PORT environment variable!');
            closeLogger().then(process.exit);
        }
    } catch (error) {
        log.fatal('Database connection error: ' + error.message);
        closeLogger().then(process.exit);
    }
};

runServer();
