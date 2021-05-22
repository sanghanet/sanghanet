import PropTypes from 'prop-types';

const FinanceTransactionPropType = PropTypes.exact({
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    pocket: PropTypes.string.isRequired,
    entryDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    //  paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deleted: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        by: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }),
    by: PropTypes.string.isRequired,
}).isRequired;

export default FinanceTransactionPropType;
