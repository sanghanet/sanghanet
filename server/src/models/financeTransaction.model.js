const { mongoose } = require('../controllers/mongoDB.controller');

const FinanceTransactionSchema = mongoose.Schema({
    amount: { type: Number, default: 0 },
    description: String,
    currency: String,
    pocket: String,
    entryDate: Date,
    dueDate: Date,
    originatorId: mongoose.ObjectId,
    paymentMethod: String,
    deletion: {
        isDeleted: Boolean,
        amountwas: Number,
        deletedBy: Object,
        deletionDate: Date
    }
});

module.exports.FinanceTransactionSchema = FinanceTransactionSchema;
module.exports.FinanceTransaction = mongoose.model('Finance Transaction', FinanceTransactionSchema);
