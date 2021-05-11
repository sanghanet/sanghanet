import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

const Questions: React.FC<RouteComponentProps> = () => {
    return (<ComingSoon pageName="Questions" isPlural />);
};

export default Questions;
