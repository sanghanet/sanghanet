const { mongoose } = require('../controllers/mongoDB.controller');

const MemberSchema = mongoose.Schema({
    label: String,
    email: { type: String, required: true },
    userId: { type: mongoose.ObjectId, default: null },
    isSuperuser: { type: Boolean, default: false },
    isFinanceAdmin: { type: Boolean, default: false },
    isEventAdmin: { type: Boolean, default: false },
    isYogaAdmin: { type: Boolean, default: false }
});

module.exports.Member = mongoose.model('Member', MemberSchema);
