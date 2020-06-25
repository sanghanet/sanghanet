import React from 'react';
import './SuggestionList.scss';
import PropTypes from 'prop-types';

const SuggestionList = (props) => {
    return (
        <ul>
            {props.names.map((name) => {
                return <li key={name} onClick = {props.handleOnClick}>{name}</li>;
            })}
        </ul>
    );
};

SuggestionList.propTypes = {
    names: PropTypes.array.isRequired,
    handleOnClick: PropTypes.func.isRequired
};

export default SuggestionList;
