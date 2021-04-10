import PropTypes, { string } from 'prop-types';

const TransactionToDeletePropType = PropTypes.exact({
    id: PropTypes.string.isRequired,
    pocket: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
}).isRequired;

export default TransactionToDeletePropType;