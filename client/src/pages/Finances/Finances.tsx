import React from 'react';
import FinanceContainer from './FinanceContainer/FinanceContainer';

const Finances: React.FC<Record<string, unknown>> = (props) => {
    return (<FinanceContainer selectedUser="own data" isFinAdmin={false} />);
};

export default Finances;
