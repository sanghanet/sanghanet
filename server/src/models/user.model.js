const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    isActive: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    emailVisible: Boolean,
    gender: String,
    genderVisible: Boolean,
    isSuperuser: Boolean,
    mobile: String,
    mobileVisible: Boolean,
    birthday: String,
    birthdayVisible: Boolean,
    joinedSangha: Date,
    createdAt: Date,
    lastLogin: { type: Date, default: Date.now() },
    yogaRank: Number,
    spiritualName: String,
    level: String,
    levelVisible: Boolean,
    address: String,
    addressVisible: Boolean,
    emName: String,
    emMobile: String,
    emEmail: String,
    emContactVisible: Boolean
});

// users collection contains User documents based on UserSchema
module.exports.User = mongoose.model('users', UserSchema);
