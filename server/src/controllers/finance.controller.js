const log4js = require('log4js');
const log = log4js.getLogger('controllers/finance.controller.js');

const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceAccount } = require('../models/financeAccount.model');
const { FinanceTransaction } = require('../models/financeTransaction.model');
const { DeletedTransaction } = require('../models/deletedTransaction.model');

const sumPocket = (result, pocket) => {
    let counter = 0;
    const date = Date.now();
    result[0].transactions[pocket].forEach(transaction => {
        if (transaction.deleted) {
            transaction.status = 'deleted';
            return;
        }
        if (transaction.dueDate < date) {
            transaction.status = 'active';
            counter += transaction.amount;
        } else {
            transaction.status = 'future';
        }
    });
    return counter;
};

module.exports.getFinanceData = async (req, res) => {
    try {
        const email = req.body.email || req.user.email;
        const result = await FinanceAccount.find({ email });

        const { transactions, userId, userName, currency } = result[0];
        const responseFinanceData = {
            transactions,
            userId,
            email,
            userName,
            currency,
            balance: {
                membership: sumPocket(result, 'membership'),
                rent: sumPocket(result, 'rent'),
                event: sumPocket(result, 'event'),
                angel: sumPocket(result, 'angel')
            }
        };

        res.json(responseFinanceData);
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};

module.exports.addTransaction = async (req, res) => {
    let amount = null; // Default value
    const dateNow = Date.now(); // In case of payment, due date is always the date of payment.
    let dueDateToDB;

    switch (req.body.transactionType) {
        case 'payment':
            amount = req.body.amount;
            dueDateToDB = dateNow;
            break;
        case 'debt':
            amount = -req.body.amount;
            dueDateToDB = req.body.dueDate;
            break;
    }

    const transaction = new FinanceTransaction({
        amount: amount,
        description: req.body.description,
        currency: 'HUF',
        pocket: req.body.pocket,
        entryDate: dateNow,
        dueDate: dueDateToDB,
        by: req.user.email
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

module.exports.deleteTransaction = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const targetPocket = `transactions.${req.body.pocket}`;
        const targetTransactionDeleted = targetPocket + '.$.deleted'; // '$' will get the array index in the query!
        const deleteObject = new DeletedTransaction({
            by: req.user.email,
            date: Date.now()
        });

        await FinanceAccount.findOneAndUpdate(
            {
                email: userEmail,
                [targetPocket]: {
                    $elemMatch: { _id: mongoose.Types.ObjectId(req.body.transactionID) }
                }
            },
            {
                $set: { [targetTransactionDeleted]: deleteObject }
            },
            { new: true, useFindAndModify: false } // new: true - returns the object after update was applied

        );
        res.status(200).send('OK');
        log.info(`Transaction ${req.body.transactionID} deleted from ${userEmail} by ${req.user.email}`);
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
