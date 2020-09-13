const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceTransactionSchema } = require('./financeTransaction.model');

const FinanceAccountSchema = mongoose.Schema({
    currency: String,
    userId: { type: mongoose.ObjectId, default: null },
    email: String,
    userName: String,
    transactions: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    }
});

module.exports.FinanceAccount = mongoose.model('financeaccount', FinanceAccountSchema);
