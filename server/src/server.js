const { DB_URL, PORT } = require('./config');

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const mongourl = 'mongodb://' + DB_URL; // Mongo DB URL later can be exported to ENV

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Successfully connected to MongoDB database.'); })
    .catch((error) => { console.log('Database connection error: ' + error.message); });

app.use(express.static('app'));

app.get('/api/members', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log('Backend server is running on port', PORT);
});
