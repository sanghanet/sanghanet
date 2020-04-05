const { mongoose } = require('../controllers/mongoDB.controller');

const FinanceTransactionSchema = mongoose.Schema({
    amount: Number,
    currency: String,
    pocket: String,
    entryDate: Date,
    originatorId: Object,
    paymentMethod: String,
    effectiveFrom: Date,
    deletion: {
        isDeleted: Boolean,
        amountwas: Number,
        deletedBy: Object,
        deletionDate: Date
    }
});

module.exports.FinanceTransaction = mongoose.model('FinanceTransaction', FinanceTransactionSchema);
