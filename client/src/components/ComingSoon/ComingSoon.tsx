import React from 'react';
import PropTypes from 'prop-types';
import './ComingSoon.scss';

interface ComingSoonProps {
    pageName: string;
    isPlural: boolean;
};

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName, isPlural }) => {
    return (
        <div className="comingSoon">{pageName} {isPlural ? 'are' : 'is'} coming soon!</div>
    );
};

ComingSoon.propTypes = {
    pageName: PropTypes.string.isRequired,
    isPlural: PropTypes.bool.isRequired
};

export default ComingSoon;
