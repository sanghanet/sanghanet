import { ObjectId } from 'mongoose';
import { IFinanceTransaction } from './FinanceTransaction';

export interface IFinanceAccount {
    currency: string,
    userId: ObjectId,
    email: string,
    userName: string,
    transactions: {
        membership: Array<IFinanceTransaction>,
        rent: Array<IFinanceTransaction>,
        event: Array<IFinanceTransaction>,
        angel: Array<IFinanceTransaction>
    }
}
