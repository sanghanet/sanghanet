import PropTypes from 'prop-types';
import FinanceTransactionPropType from './FinanceTransactionPropType';

const TransactionsPropType = PropTypes.exact({
    membership: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
    rent: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
    event: PropTypes.arrayOf(FinanceTransactionPropType).isRequired,
    angel: PropTypes.arrayOf(FinanceTransactionPropType).isRequired
}).isRequired

export default TransactionsPropType;