import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Events: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Events" isPlural />);
};

export default Events;
