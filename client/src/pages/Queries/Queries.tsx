import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Queries: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Queries" isPlural />);
};

export default Queries;
