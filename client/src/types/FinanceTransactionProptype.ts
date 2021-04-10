import PropTypes from 'prop-types';

const FinanceTransactionProptype = PropTypes.exact({
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    pocket: PropTypes.string.isRequired,
    entryDate: PropTypes.instanceOf(Date).isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deleted: PropTypes.exact({
        by: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
    }),
    by: PropTypes.string.isRequired,
}).isRequired;

export default FinanceTransactionProptype;
