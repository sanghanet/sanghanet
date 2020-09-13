const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { FinanceAccount } = require('../models/financeAccount.model');

module.exports.getFinanceData = async (req, res) => {
    try {
        if (req.body.email) {
            const result = await FinanceAccount.find({ email: req.body.email });
            res.json({
                ...result,
                pockets: {
                    membership: { currentBalance: 1100 },
                    rent: { currentBalance: 1300 },
                    event: { currentBalance: 1500 },
                    angel: { currentBalance: 1700 }
                }
            });
        } else {
            const result = await FinanceAccount.find({ email: req.user.email });
            res.json({
                ...result,
                pockets: {
                    membership: { currentBalance: 100 },
                    rent: { currentBalance: 300 },
                    event: { currentBalance: 500 },
                    angel: { currentBalance: 700 }
                }
            });
        }
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};

module.exports.getUserList = async (req, res) => {
    try {
        const result = await FinanceAccount.find({}, 'userName email');
        res.json(result);
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};
