import { Schema, model } from 'mongoose';
import { IMember } from '../interfaces/Member';

const MemberSchema = new Schema({
    label: String,
    email: { type: String, required: true },
    registered: { type: Boolean, default: false },
    level: String,
    isSuperuser: { type: Boolean, default: false },
    isFinanceAdmin: { type: Boolean, default: false },
    isEventAdmin: { type: Boolean, default: false },
    isYogaAdmin: { type: Boolean, default: false }
});

const Member = model<IMember>('Member', MemberSchema);

export default Member;
