const fs = require('fs');
// const readline = require('readline');

const log4js = require('log4js');
const log = log4js.getLogger('dbReset.js');
const { mongoose } = require('../src/controllers/mongoDB.controller');

const { Member } = require('../src/models/member.model');
const { RegisteredUser } = require('../src/models/registered.user.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

const memberList = JSON.parse(fs.readFileSync('./members.json'));

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const confirm = () => {
//     rl.question('Are you sure you would like to wipe the database and reset it? (y/n)', (ans) => {
//         switch (ans) {
//             case 'y':
//             case 'Y':
//                 rl.close();
//                 return true;

//             case 'n':
//             case 'N':
//                 rl.close();
//                 return false;

//             default:
//                 log.error('Invalid answer');
//                 confirm();
//                 rl.close();
//                 break;
//         }
//     });
// };

// rl.on('close', () => {
//     console.log('\nStarting DB reset process...');
//     process.exit(0);
// });

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