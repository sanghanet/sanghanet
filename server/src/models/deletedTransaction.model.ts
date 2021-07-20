import { Schema, model } from 'mongoose';
import { IDeletedTransaction } from '../interfaces/DeletedTransaction';

const DeletedTransactionSchema = new Schema({
    by: { type: String, required: true },
    date: { type: Date, required: true }
});

const DeletedTransaction = model<IDeletedTransaction>('Deleted Transaction', DeletedTransactionSchema);

export {
    DeletedTransactionSchema,
    DeletedTransaction
};
