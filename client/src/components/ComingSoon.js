import React from 'react';
import PropTypes from 'prop-types';
import './ComingSoon.scss';

const ComingSoon = (props) => {
    return (
        <div className= 'comingSoon'>{props.pageName} coming soon!</div>
    );
};

ComingSoon.propTypes = {
    pageName: PropTypes.string.isRequired
};

export default ComingSoon;
