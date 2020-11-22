const { mongoose } = require('../controllers/mongoDB.controller');
const { DeletedTransactionSchema } = require('./deletedTransaction.model');

const FinanceTransactionSchema = mongoose.Schema({
    amount: { type: Number, default: 0 },
    description: String,
    currency: String,
    pocket: String,
    entryDate: Date,
    dueDate: Date,
    originatorId: mongoose.ObjectId,
    paymentMethod: String,
    status: { type: String, default: '' }, // calculated on the fly, during fetch
    deleted: { type: DeletedTransactionSchema, default: null },
    by: String
});

module.exports.FinanceTransactionSchema = FinanceTransactionSchema;
module.exports.FinanceTransaction = mongoose.model('Finance Transaction', FinanceTransactionSchema);
