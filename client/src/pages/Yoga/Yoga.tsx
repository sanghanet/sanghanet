import React from 'react';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

interface YogaProps {};

const Yoga: React.FC<YogaProps> = (props) => {
    return (<ComingSoon pageName = "Yoga" isPlural = {false} />);
};

export default Yoga;
