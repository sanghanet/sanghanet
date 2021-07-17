import { Schema, model } from 'mongoose';

const DeletedTransactionSchema = new Schema({
    by: { type: String, required: true },
    date: { type: Date, required: true }
});

const DeletedTransaction = model('Deleted Transaction', DeletedTransactionSchema);

export {
    DeletedTransactionSchema,
    DeletedTransaction
};
