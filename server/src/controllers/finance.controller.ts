import mongoose from 'mongoose';
import { Response } from 'express';
import { IFinanceAccount } from '../interfaces/FinanceAccount';
import FinanceAccount from '../models/financeAccount.model';
import { IFinanceTransaction } from '../interfaces/FinanceTransaction';
import { FinanceTransaction } from '../models/financeTransaction.model';
import { DeletedTransaction } from '../models/deletedTransaction.model';

import log4js from 'log4js';
import { IDeletedTransaction } from '../interfaces/DeletedTransaction';
const log = log4js.getLogger('controllers/finance.controller.js');

const sumPocket = (result: Array<IFinanceAccount>, pocket: Pocket) => {
    let counter = 0;
    const date = Date.now();
    result[0].transactions[pocket].forEach((transaction: IFinanceTransaction) => {
        if (transaction.deleted) {
            transaction.status = 'deleted';
            return;
        }
        if (Date.parse(transaction.dueDate) < date) {
            transaction.status = 'active';
            counter += transaction.amount;
        } else {
            transaction.status = 'future';
        }
    });
    return counter;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFinanceData = async (req: any, res: Response): Promise<void> => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addTransaction = async (req: any, res: Response): Promise<void> => {
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

    const transaction: IFinanceTransaction = new FinanceTransaction({
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteTransaction = async (req: any, res: Response): Promise<void> => {
    try {
        const userEmail = req.body.email;
        const targetPocket = `transactions.${req.body.pocket}`;
        const targetTransactionDeleted = targetPocket + '.$.deleted'; // '$' will get the array index in the query!
        const deleteObject: IDeletedTransaction = new DeletedTransaction({
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserList = async (req: any, res: Response): Promise<void> => {
    try {
        const result: Array<IFinanceAccount> = await FinanceAccount.find({}, 'userName email');
        res.json(result);
    } catch (error) {
        log.error(error);
        res.send(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportData = async (req: any, res: Response): Promise<void> => {
    res.header('Content-Type', 'text/csv');
    const fileName = new Date().toISOString().concat('.csv');
    res.attachment(fileName);
    res.send(`userName,email,pocket,date,amount,status
Alajos,alajos@gmail.com,membership,2021.09.10,10000,ok
Belzebub,belzebub@hell.com,angel,6666.06.06,666,yeppeee!`
    );
};

const financeController = {
    getFinanceData,
    addTransaction,
    deleteTransaction,
    getUserList,
    exportData
};

export default financeController;
