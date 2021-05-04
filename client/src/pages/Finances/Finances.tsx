import React from 'react';
import FinanceContainer from './FinanceContainer/FinanceContainer';

type FinancesProps = {};

const Finances: React.FC<FinancesProps> = (props) => {
    return (<FinanceContainer selectedUser="own data" isFinAdmin={false} />);
};

export default Finances;
