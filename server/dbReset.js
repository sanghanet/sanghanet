const log4js = require('log4js');
const log = log4js.getLogger('generateFinanceAccounts.js');
const { mongoose } = require('./src/controllers/mongoDB.controller');

const { Member } = require('./src/models/member.model');
const { RegisteredUser } = require('./src/models/registered.user.model');
const { initDBConnection } = require('./src/controllers/mongoDB.controller');

const wipeCollections = async () => {
    await Member.deleteMany({})
        .then(() => log.info('Members wiped successfully!'))
        .catch((error) => {
            log.error(error);
            mongoose.disconnect();
        });
    await RegisteredUser.deleteMany({})
        .then(() => log.info('Registered users wiped successfully!'))
        .catch((error) => {
            log.error(error);
            mongoose.disconnect();
        });
};

const createMember = (label, email) => {
    return Member.create({
        label: label,
        email: email
    });
};

const createMemberPromises = (memberArray) => {
    try {
        const promiseArray = [];
        memberArray.forEach(member => {
            promiseArray.push(createMember(member.label, member.email));
        });
        return promiseArray;
    } catch (error) {
        log.error(error);
        mongoose.disconnect();
    }
};

const executeWipeAndCreate = async () => {
    initDBConnection();
    await wipeCollections();
    const membersCreated = createMemberPromises([{ email: 'asdf@gmail.com', label: 'Belacska' }, { email: 'sadfasdf@gmail.com', label: 'Jolanka' }]);
    Promise.all(membersCreated)
        .then((res) => {
            res.forEach(member => {
                log.info(`Document in 'members' successfully created for ${member.email}`);
            });
            mongoose.disconnect();
        });
};

executeWipeAndCreate()
    .catch((error) => {
        log.error(error);
        mongoose.disconnect();
    });
