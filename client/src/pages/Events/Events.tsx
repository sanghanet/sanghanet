import React from 'react';
import ComingSoon from '../../components/ComingSoon/ComingSoon';

interface EventsProps {};

const Events: React.FC<EventsProps> = (props) => {
    return (<ComingSoon pageName = "Events" isPlural = {true} />);
};

export default Events;
