const log4js = require('log4js');
const log = log4js.getLogger('generateFinanceAccounts.js');
const { mongoose } = require('../src/controllers/mongoDB.controller');

const { Member } = require('../src/models/member.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const { FinanceAccount } = require('../src/models/financeAccount.model');
const { FinanceTransaction } = require('../src/models/financeTransaction.model');
const { DeletedTransaction } = require('../src/models/deletedTransaction.model');

const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
const oneWeek = 7 * oneDay;
const threeMonth = 12 * oneWeek;

// -3 month, -1 week, -1 day, -1 hour, now, 3 min, 1 hour, 1 day, 1 week, 3 month]
const dateOffset = [-threeMonth, -oneWeek, -oneDay, -oneHour, 0, 3 * oneMinute, oneHour, oneDay, oneWeek, threeMonth];

const generateRandomTransactions = (pocket) => {
    const randomTransactions = [];
    const date = Date.now();
    for (let i = 0; i < 10; i++) {
        const amount = pocket === 'angel' ? Math.floor(Math.random() * 10000) : Math.floor(Math.random() * 100000) - 50000;
        const dueDate = amount <= 0 ? date + dateOffset[i] : date;
        const deleted = Math.random() < 0.2 ? new DeletedTransaction({
            by: 'mindblowing.js@gmail.com',
            date: date
        }) : null;
        randomTransactions.push(new FinanceTransaction({
            amount: amount,
            description: 'Randomly generated test transaction',
            currency: 'HUF',
            entryDate: date,
            dueDate: dueDate,
            pocket: pocket,
            deleted: deleted
        }));
    }
    return randomTransactions;
};

const wipeAccounts = async () => {
    await FinanceAccount.deleteMany({})
        .then(() => { log.info('Finance accounts wiped successfully!'); })
        .catch((error) => {
            log.error(error);
            mongoose.disconnect();
        });
};

const getUserList = async () => {
    let userArray = null;
    try {
        userArray = await Member.find({});
        log.info('Members fetched!');
    } catch (error) {
        log.error(error);
        mongoose.disconnect();
    }
    return userArray;
};

const singleAccountCreationPromise = (element) => {
    return FinanceAccount.create({
        userId: element._id,
        email: element.email,
        userName: element.label,
        currency: 'HUF',
        transactions: {
            membership: generateRandomTransactions('membership'),
            rent: generateRandomTransactions('rent'),
            event: generateRandomTransactions('event'),
            angel: generateRandomTransactions('angel')
        }
    });
};

const getCreationPromises = (userArray) => {
    try {
        const promiseArray = [];
        userArray.forEach((element) => {
            promiseArray.push(singleAccountCreationPromise(element));
        });
        return promiseArray;
    } catch (error) {
        log.error(error);
        mongoose.disconnect();
    }
};

const executeWipeandBuild = async () => {
    initDBConnection();
    await wipeAccounts();
    const userArray = await getUserList();
    const AccountCreationPromises = getCreationPromises(userArray);
    Promise.all(AccountCreationPromises)
        .then((res) => {
            res.forEach((element) => {
                log.info(`Account successfully created for ${element.email}`);
            });
        })
        .then(mongoose.disconnect);
};

executeWipeandBuild()
    .catch((error) => {
        log.error(error);
        mongoose.disconnect();
    });
