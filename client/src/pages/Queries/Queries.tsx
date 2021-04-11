import React from 'react';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

interface QueriesProps {};

const Queries: React.FC<QueriesProps> = (props) => {
    return (<ComingSoon pageName = "Queries" isPlural = {true} />);
};

export default Queries;
