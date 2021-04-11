import React from 'react';
import ComingSoon from '../../../components/ComingSoon/ComingSoon';

interface AdminEventProps {};

const AdminEvent: React.FC<AdminEventProps> = (props) => {
    return (<ComingSoon pageName = "Event Admin" isPlural = {false} />);
};

export default AdminEvent;
