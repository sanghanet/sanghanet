import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import './TransactionExport.scss';

interface TransactionExportProps {
    handleTransactionExport: React.MouseEventHandler<HTMLButtonElement>;
};

const TransactionExport: React.FC<TransactionExportProps> = ({ handleTransactionExport }) => {
    return (
        <div className="transactionExport">
            <Button onClick={handleTransactionExport}>Transaction export is coming soon!</Button>
        </div>
    );
};

TransactionExport.propTypes = {
    handleTransactionExport: PropTypes.func.isRequired
};

export default TransactionExport;
