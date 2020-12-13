const { mongoose } = require('../controllers/mongoDB.controller');

const DeletedTransactionSchema = mongoose.Schema({
    by: String,
    date: Date
});

module.exports.DeletedTransactionSchema = DeletedTransactionSchema;
module.exports.DeletedTransaction = mongoose.model('Deleted Transaction', DeletedTransactionSchema);
