import React from 'react';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

interface QuestionsProps {};

const Questions: React.FC<QuestionsProps> = (props) => {
    return (<ComingSoon pageName = "Questions" isPlural = {true} />);
};

export default Questions;
