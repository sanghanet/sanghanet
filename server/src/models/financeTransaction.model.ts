import { mongoose } from '../controllers/mongoDB.controller';
import { DeletedTransactionSchema } from './deletedTransaction.model';

const FinanceTransactionSchema = new mongoose.Schema({
    amount: { type: Number, default: 0 },
    description: String,
    currency: String,
    pocket: String,
    entryDate: Date,
    dueDate: Date,
    originatorId: mongoose.Types.ObjectId,
    paymentMethod: String,
    status: { type: String, default: '' }, // calculated on the fly, during fetch
    deleted: { type: DeletedTransactionSchema, default: null },
    by: String
});

const FinanceTransaction = mongoose.model('Finance Transaction', FinanceTransactionSchema);

export { FinanceTransactionSchema, FinanceTransaction };
