import React from 'react';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

interface DashboardProps {};

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (<ComingSoon pageName = "Dashboard" isPlural = {false} />);
}

export default Dashboard;
