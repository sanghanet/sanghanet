const fs = require('fs');
// const readline = require('readline');

const log4js = require('log4js');
const log = log4js.getLogger('dbReset.js');
const { mongoose } = require('../src/controllers/mongoDB.controller');

const { Member } = require('../src/models/member.model');
const { RegisteredUser } = require('../src/models/registered.user.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const memberList = JSON.parse(fs.readFileSync('./members.json'));

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

const createMember = (label, email, isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin, level) => {
    return Member.create({
        label: label,
        email: email,
        isSuperuser: isSuperuser,
        isFinanceAdmin: isFinanceAdmin,
        isEventAdmin: isEventAdmin,
        isYogaAdmin: isYogaAdmin,
        level: level
    });
};

const createMemberPromises = (memberArray) => {
    try {
        const promiseArray = [];
        memberArray.forEach(member => {
            const { label, email, isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin, level } = member;
            promiseArray.push(createMember(
                label,
                email,
                isSuperuser,
                isFinanceAdmin,
                isEventAdmin,
                isYogaAdmin,
                level
            ));
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

    const membersCreated = createMemberPromises(memberList);
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
