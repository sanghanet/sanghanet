import { DB_URL } from '../config';
import mongoose from 'mongoose';

import log4js from 'log4js';
const log = log4js.getLogger('controllers/mongoDB.controller.js');

const initDBConnection = async () => {
    mongoose.connection.on('connected', () => {
        log.info('Successfully connected to: ', DB_URL);
    });

    mongoose.connection.on('disconnected', () => {
        log.error('MongoDB disconnected!');
    });

    mongoose.connection.on('reconnected', () => {
        log.info('MongoDB connection reestablished');
    });

    mongoose.connection.on('error', (error) => {
        log.fatal('MongoDB error: ', error.message);
        log4js.shutdown(process.exit);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            log.fatal('MongoDB connection is disconnected due to application termination');
            log4js.shutdown(process.exit);
        });
    });
    try {
        await mongoose.connect(
            DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                autoReconnect: true,
                reconnectTries: 10,
                reconnectInterval: 3000
            }
        );
    } catch (error) {
        log.fatal('MongoDB connection error: ' + error.message);
        log4js.shutdown(process.exit);
    }
};

export {
    initDBConnection,
    mongoose
};
