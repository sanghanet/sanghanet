import React from 'react';
import PropTypes from 'prop-types';
import './ComingSoon.scss';

const ComingSoon = (props) => {
    return (
        <div className= 'comingSoon'>{props.pageName} {props.isPlural ? 'are' : 'is'} coming soon!</div>
    );
};

ComingSoon.propTypes = {
    pageName: PropTypes.string.isRequired,
    isPlural: PropTypes.bool.isRequired
};

export default ComingSoon;
