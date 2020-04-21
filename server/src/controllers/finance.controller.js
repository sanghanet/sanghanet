const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { FinanceAccount } = require('../models/FinanceAccount.model');

module.exports.getFinanceOverview = async (req, res) => {
    try {
        const result = await FinanceAccount.find({ userId: req.user._id }, 'pockets currency');
        res.json(result);
    } catch (err) {
        log.error(err);
        res.send(err);
    }
};

module.exports.getFinanceTransactions = async (req, res) => {
    try {
        const result = await FinanceAccount.find({ userId: req.user._id }, 'transactionBuffer');
        res.json(result);
    } catch (err) {
        log.error(err);
        res.send(err);
    }
};
