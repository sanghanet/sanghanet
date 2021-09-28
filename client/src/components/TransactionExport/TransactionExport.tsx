import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UIcontext } from '../contexts/UIcontext/UIcontext';

import Button from 'react-bootstrap/Button';
import './TransactionExport.scss';

interface TransactionExportProps {
    handleTransactionExport: React.MouseEventHandler<HTMLButtonElement>;
};

const TransactionExport: React.FC<TransactionExportProps> = ({ handleTransactionExport }) => {
    const { EXPORTTRANSACTION } = useContext(UIcontext).dictionary.transactionExport;
    return (
        <div className="transactionExport">
            <Button onClick={handleTransactionExport}>{EXPORTTRANSACTION}</Button>
        </div>
    );
};

TransactionExport.propTypes = {
    handleTransactionExport: PropTypes.func.isRequired
};

export default TransactionExport;
