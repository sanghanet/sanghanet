import { Schema, model } from 'mongoose';

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

const Member = model('Member', MemberSchema);

export default Member;
