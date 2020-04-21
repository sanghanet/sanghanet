const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceTransactionSchema } = require('./financeTransaction.model');

const FinanceAccountSchema = mongoose.Schema({
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
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        rent: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        event: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        angel: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        }
    }
});

module.exports.FinanceAccount = mongoose.model('FinanceAccount', FinanceAccountSchema);
