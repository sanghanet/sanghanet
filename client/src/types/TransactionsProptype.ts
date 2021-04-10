import PropTypes from 'prop-types';
import FinanceTransactionProptype from './FinanceTransactionProptype';

const TransactionsProptype = PropTypes.exact({
    membership: PropTypes.arrayOf(FinanceTransactionProptype).isRequired,
    rent: PropTypes.arrayOf(FinanceTransactionProptype).isRequired,
    event: PropTypes.arrayOf(FinanceTransactionProptype).isRequired,
    angel: PropTypes.arrayOf(FinanceTransactionProptype).isRequired
}).isRequired

export default TransactionsProptype;