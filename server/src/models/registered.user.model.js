const { mongoose } = require('../controllers/mongoDB.controller');

const RegisteredUserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: { type: String, required: true },
    email: { type: String, required: true },
    emailVisible: Boolean,
    gender: String,
    genderVisible: Boolean,
    mobile: String,
    mobileVisible: Boolean,
    birthday: String,
    birthdayVisible: Boolean,
    createdAt: Date,
    lastLogin: { type: Date, default: Date.now() },
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

module.exports.RegisteredUser = mongoose.model('registered users', RegisteredUserSchema);
