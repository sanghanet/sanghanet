const log4js = require('log4js');
const log = log4js.getLogger('generateFinanceAccounts.js');
const { mongoose } = require('../src/controllers/mongoDB.controller');

const { Member } = require('../src/models/member.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const { FinanceAccount } = require('../src/models/financeAccount.model');
const { FinanceTransactionSchema } = require('../src/models/financeTransaction.model');
const FinanceTransaction = mongoose.model('Finance Transaction', FinanceTransactionSchema);

const generateRandomTransactions = (pocket) => {
    const randomTransactions = [];
    for (let i = 0; i < 10; i++) {
        randomTransactions.push(new FinanceTransaction({
            amount: Math.floor(Math.random() * 100000) - 50000,
            description: 'Randomly generated test transaction',
            currency: 'HUF',
            pocket: pocket
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
        log.info('Users fetched!');
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
        transactionBuffer: {
            membership: generateRandomTransactions('membership'),
            rent: generateRandomTransactions('rent'),
            event: generateRandomTransactions('event'),
            angel: generateRandomTransactions('angel')
        },
        transactionArchive: {
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
            res.forEach(element => {
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
