import { SESSION_SECRET } from '../config';

import session from 'express-session';
import connectMongo from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const MongoStore = connectMongo(session);

const sessionMiddleware = session({
    genid: () => uuidv4(),
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 1000 * 60 * 30, // 1000 * 60 * X === X minutes
        secure: false
    },
    rolling: true,
    name: 'Sanghanet.backend',
    saveUninitialized: false
});

export default sessionMiddleware;
