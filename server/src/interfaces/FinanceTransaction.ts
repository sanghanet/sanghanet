import { ObjectId } from 'mongoose';
import { IDeletedTransaction } from './DeletedTransaction';

export interface IFinanceTransaction {
    amount: number,
    description: string,
    currency: string,
    pocket: string,
    entryDate: string,
    dueDate: string,
    originatorId: ObjectId,
    paymentMethod: string,
    status: string
    deleted: IDeletedTransaction,
    by: string
}
