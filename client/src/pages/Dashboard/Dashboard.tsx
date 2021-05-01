import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Dashboard: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Dashboard" isPlural={false} />);
};

export default Dashboard;
