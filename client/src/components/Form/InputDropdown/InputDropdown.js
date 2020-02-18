import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputDropdown.scss';

import { Col } from 'react-bootstrap';

class InputDropdown extends Component {
    render () {
        const { children } = this.props;

        return (
            <Col xm={12} lg={6} className="input-dropdown">
                {children}
            </Col>
        );
    }
}

InputDropdown.propTypes = {
    // headerInput: PropTypes.element.isRequired,
    // bodyInputs: PropTypes.array.isRequired
    children: PropTypes.element.isRequired
};

export default InputDropdown;
