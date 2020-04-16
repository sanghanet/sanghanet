const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceTransactionSchema } = require('./financeTransaction.model');

const FinanceSchema = mongoose.Schema({
    currency: String,
    userId: mongoose.ObjectId,
    userName: String,
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
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            },
            rollingBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            }
        },
        rent: {
            currentBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            },
            rollingBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            }
        },
        event: {
            currentBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            },
            rollingBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            }
        },
        angel: {
            currentBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            },
            rollingBalance: {
                value: { type: Number, default: 0 },
                isValid: { type: Boolean, default: false }
            }
        }
    }
});

module.exports.Account = mongoose.model('Finance Account', FinanceSchema);
