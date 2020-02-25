const { mongoose } = require('../controllers/mongoDB.controller');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    isSuperuser: Boolean,
    isActive: Boolean,
    phone: String,
    birthDate: String,
    joinedSangha: Date,
    createdAt: Date,
    lastLogin: { type: Date, default: Date.now() },
    yogaRank: Number
});

// users collection contains User documents based on UserSchema
module.exports.User = mongoose.model('users', UserSchema);
