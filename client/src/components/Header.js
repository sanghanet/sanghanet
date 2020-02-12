import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import { Container } from 'react-bootstrap';

const Header = (props) => {
    return (
        <Container as='header'>
            asdf
        </Container>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Header);
