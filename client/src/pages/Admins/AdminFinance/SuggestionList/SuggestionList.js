import React from 'react';
import './SuggestionList.scss';

const SuggestionList = (props) => {
    return (
        <ul>
            {props.names.map((name, index) => {
                return <li key={name}>{name}</li>;
            })}
        </ul>
    );
};

export default SuggestionList;
