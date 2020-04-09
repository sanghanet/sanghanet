const { FinanceAccount } = require('../src/models/financeAccount.model');
const { User } = require('../src/models/user.model');
const { initDBConnection } = require('../src/controllers/mongoDB.controller');

console.log('Hello World');

const connectDatabase = async () => {
    await initDBConnection();

    User.findOne()
        .then((res) => { console.log(res); });
};

connectDatabase();
