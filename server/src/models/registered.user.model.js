const { mongoose } = require('../controllers/mongoDB.controller');

const RegisteredUserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImg: { type: String, required: true },
    email: { type: String, required: true },
    emailVisible: { type: Boolean, default: false },
    gender: { type: String, default: '' },
    genderVisible: { type: Boolean, default: false },
    mobile: { type: String, default: '' },
    mobileVisible: { type: Boolean, default: false },
    birthday: { type: String, default: '' },
    birthdayVisible: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    lastLogin: { type: Date, default: Date.now() },
    spiritualName: { type: String, required: true },
    level: { type: String, default: '' },
    levelVisible: { type: Boolean, default: false },
    address: { type: String, default: '' },
    addressVisible: { type: Boolean, default: false },
    emName: { type: String, default: '' },
    emMobile: { type: String, default: '' },
    emEmail: { type: String, default: '' },
    emContactVisible: { type: Boolean, default: false }
});

module.exports.RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);
