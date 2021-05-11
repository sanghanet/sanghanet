import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const AdminEvent: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Event Admin" isPlural={false} />);
};

export default AdminEvent;
