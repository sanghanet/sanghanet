import { Schema, model, Types } from 'mongoose';
import { IFinanceAccount } from '../interfaces/FinanceAccount';
import { FinanceTransactionSchema } from './financeTransaction.model';

const FinanceAccountSchema = new Schema({
    currency: String,
    userId: { type: Types.ObjectId, default: null },
    email: String,
    userName: String,
    transactions: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    }
});

const FinanceAccount = model<IFinanceAccount>('financeaccount', FinanceAccountSchema);

export default FinanceAccount;
