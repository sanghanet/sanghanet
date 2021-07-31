import { Document } from 'mongoose';

export interface IDeletedTransaction extends Document {
    by: string,
    date: string
}
