const log4js = require('log4js');
const log = log4js.getLogger('generateFinanceAccounts.js');

const mongoose = require('mongoose');
const { FinanceAccountSchema } = require('../src/models/financeAccount.model');
const { User } = require('../src/models/user.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const account = mongoose.model('Finance Account', FinanceAccountSchema);

const connectDatabase = async () => {
    await initDBConnection();

    account.deleteMany({}, (err) => {
        if (err) { log.fatal(err); }
        log.info('Finance accounts succesfully wiped!');
    });

    User.find({}, (err, res) => {
        if (err) { log.fatal(err); }
        res.forEach(element => {
            account.create({ userId: element._id, userName: `${element.firstName} ${element.lastName}` });
        });
        log.info('Finance accounts successfully generated!');
    });
};

connectDatabase();
