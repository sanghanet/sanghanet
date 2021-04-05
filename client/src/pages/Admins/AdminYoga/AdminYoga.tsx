import React from 'react';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

interface AdminYogaProps {};

const AdminYoga: React.FC<AdminYogaProps> = (props) => {
    return (<ComingSoon pageName = "Yoga Admin" isPlural = {false} />);
};

export default AdminYoga;
