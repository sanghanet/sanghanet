const mongoose = require('mongoose');
const { FinanceTransactionSchema } = require('./financeTransaction.model');

const FinanceSchema = mongoose.Schema({
    userId: Object,
    transactionArchive: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    },
    transactionBuffer: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    },
    pockets: {
        membership: {
            currentBalance: {
                value: Number,
                isValid: Boolean
            },
            rollingBalance: {
                value: Number,
                isValid: Boolean
            }
        },
        rent: {
            currentBalance: {
                value: Number,
                isValid: Boolean
            },
            rollingBalance: {
                value: Number,
                isValid: Boolean
            }
        },
        event: {
            currentBalance: {
                value: Number,
                isValid: Boolean
            },
            rollingBalance: {
                value: Number,
                isValid: Boolean
            }
        },
        angel: {
            currentBalance: {
                value: Number,
                isValid: Boolean
            },
            rollingBalance: {
                value: Number,
                isValid: Boolean
            }
        }
    }
});

module.exports.FinanceAccountSchema = FinanceSchema;
