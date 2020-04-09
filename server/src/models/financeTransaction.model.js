const mongoose = require('mongoose');

const FinanceTransactionSchema = mongoose.Schema({
    amount: Number,
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
