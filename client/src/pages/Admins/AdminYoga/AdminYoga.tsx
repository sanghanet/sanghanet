import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

const AdminYoga: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Yoga Admin" isPlural={false} />);
};

export default AdminYoga;
