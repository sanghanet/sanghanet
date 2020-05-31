const { mongoose } = require('../controllers/mongoDB.controller');

const FinanceTransactionSchema = mongoose.Schema({
    amount: { type: Number, default: 0 },
    description: String,
    currency: String,
    pocket: String,
    entryDate: Date,
    originatorId: mongoose.ObjectId,
    paymentMethod: String,
    effectiveFrom: Date,
    deletion: {
        isDeleted: Boolean,
        amountwas: Number,
        deletedBy: Object,
        deletionDate: Date
    }
});

module.exports.FinanceTransactionSchema = FinanceTransactionSchema;
