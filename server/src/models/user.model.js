const { mongoose } = require('../controllers/mongoDB.controller');

const UserSchema = mongoose.Schema({
    isActive: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    isSuperuser: Boolean,
    mobile: String,
    birthday: String,
    joinedSangha: Date,
    createdAt: Date,
    lastLogin: { type: Date, default: Date.now() },
    yogaRank: Number,
    spiritualName: String,
    level: String,
    address: String,
    emName: String,
    emMobile: String,
    emEmail: String
});

// users collection contains User documents based on UserSchema
module.exports.User = mongoose.model('users', UserSchema);
