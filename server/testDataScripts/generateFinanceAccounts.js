const log4js = require('log4js');
const log = log4js.getLogger('generateFinanceAccounts.js');
const { mongoose } = require('../src/controllers/mongoDB.controller');

const { User } = require('../src/models/user.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const { Account } = require('../src/models/financeAccount.model');

const wipeAccounts = async () => {
    await Account.deleteMany({})
        .then(() => { log.info('Finance accounts wiped successfully!'); })
        .catch((error) => {
            log.error(error);
            mongoose.disconnect();
        });
};

const getUserList = async () => {
    let userArray = null;
    try {
        userArray = await User.find({});
        log.info('Users fetched!');
    } catch (error) {
        log.error(error);
        mongoose.disconnect();
    }
    return userArray;
};

const singleAccountCreationPromise = (element) => {
    return Account.create({ userId: element._id, userName: `${element.firstName} ${element.lastName}` });
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
                log.info(`Account successfully created for ${element.userName}`);
            });
        })
        .then(mongoose.disconnect);
};

executeWipeandBuild()
    .catch((error) => {
        log.error(error);
        mongoose.disconnect();
    });