const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { FinanceAccount } = require('../models/financeAccount.model');

module.exports.getFinanceData = async (req, res) => {
    try {
        const result = await FinanceAccount.find({ userId: req.user._id });
        res.json(result);
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};
