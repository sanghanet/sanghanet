const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceTransaction } = require('./financeTransaction.model');

const FinanceSchema = mongoose.Schema({
    userId: Object,
    transactionArchive: {
        membership: [{ FinanceTransaction }],
        rent: [{ FinanceTransaction }],
        event: [{ FinanceTransaction }],
        angel: [{ FinanceTransaction }]
    },
    transactionBuffer: {
        membership: [{ FinanceTransaction }],
        rent: [{ FinanceTransaction }],
        event: [{ FinanceTransaction }],
        angel: [{ FinanceTransaction }]
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

module.exports.FinanceAccount = mongoose.model('financeAccount', FinanceSchema);
