const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { FinanceAccount } = require('../models/financeAccount.model');
const { FinanceTransaction } = require('../models/financeTransaction.model');

const sumPocket = (result, pocket) => {
    let counter = 0;
    result[0].transactions[pocket].forEach(transaction => {
        counter += transaction.amount;
    });
    return counter;
};

module.exports.getFinanceData = async (req, res) => {
    try {
        if (req.body.email) {
            const result = await FinanceAccount.find({ email: req.body.email });
            res.json({
                ...result,
                balance: {
                    membership: sumPocket(result, 'membership'),
                    rent: sumPocket(result, 'rent'),
                    event: sumPocket(result, 'event'),
                    angel: sumPocket(result, 'angel')
                }
            });
        } else {
            const result = await FinanceAccount.find({ email: req.user.email });

            res.json({
                ...result,
                balance: {
                    membership: sumPocket(result, 'membership'),
                    rent: sumPocket(result, 'rent'),
                    event: sumPocket(result, 'event'),
                    angel: sumPocket(result, 'angel')
                }
            });
        }
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};

module.exports.addTransaction = async (req, res) => {
    const transaction = new FinanceTransaction({
        amount: req.body.amount,
        description: req.body.description,
        currency: 'HUF',
        pocket: req.body.pocket,
        entryDate: Date.now()
    });

    try {
        const targetPocket = `transactions.${req.body.pocket}`;
        await FinanceAccount.findOneAndUpdate(
            { email: req.body.email },
            {
                $push: { [targetPocket]: transaction }
            },
            { new: true, useFindAndModify: false } // new: true - returns the object after update was applied

        );
        res.json(transaction);
        log.info('Transaction created succesfully.');
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
