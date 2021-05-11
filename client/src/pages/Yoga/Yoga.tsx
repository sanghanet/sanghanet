import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Yoga: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Yoga" isPlural={false} />);
};

export default Yoga;
