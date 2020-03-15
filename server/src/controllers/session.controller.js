const { SESSION_SECRET } = require('../config');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuidv4 = require('uuid/v4');
const { mongoose } = require('./mongoDB.controller');

const sessionMiddleware = session({
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 1000 * 60 * 2, // 1000 * 60 * X === X minutes
        secure: false
    },
    rolling: true,
    name: 'Sanghanet.backend',
    saveUninitialized: false
});

module.exports = sessionMiddleware;
