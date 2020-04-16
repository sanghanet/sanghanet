const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { Account } = require('../models/financeAccount.model');

module.exports.getFinanceOverview = async (req, res) => {
    try {
        const result = await Account.find({ userId: req.user._id }, 'pockets currency');
        res.json(result);
    } catch (err) {
        log.error(err);
        res.send(err);
    }
};
