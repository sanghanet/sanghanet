import { Document } from 'mongoose';

export interface IMember extends Document {
    label: string,
    email: string,
    registered: boolean,
    level: string,
    isSuperuser: boolean,
    isFinanceAdmin: boolean,
    isEventAdmin: boolean,
    isYogaAdmin: boolean
}
