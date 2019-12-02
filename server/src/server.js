const { DB_URL, PORT } = require('./config');
const { logManager, closeLogger, FILENAME_MAX_LENGTH } = require('./logManager');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongourl = 'mongodb://' + DB_URL; // Mongo DB URL later can be exported to ENV

const log = logManager.createLogger('src/server.js'.padEnd(FILENAME_MAX_LENGTH));

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { log.info('Successfully connected to MongoDB database.'); })
    .catch((error) => {
        log.fatal('Database connection error: ' + error.message);
        closeLogger().then(process.exit);
    });

app.use(express.static('app'));

app.get('/api/members', function (req, res) {
    res.send('Hello World!');
});

if (PORT) {
    app.listen(PORT, () => {
        log.info('Server is listening on port: ', PORT);
    }).on('error', (error) => {
        log.fatal(error.message);
        closeLogger().then(process.exit);
    });
}
