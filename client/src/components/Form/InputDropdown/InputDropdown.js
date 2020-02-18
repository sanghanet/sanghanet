import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './InputDropdown.scss';

import { Col, Accordion } from 'react-bootstrap';

class InputDropdown extends Component {
    render () {
        return (
            <Col xm={12} lg={6}>
                <Accordion>
                    <Accordion.Toggle>
                        testHeader
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        testbody
                    </Accordion.Collapse>
                </Accordion>
            </Col>
        );
    }
}

// Input.propTypes = {

// };

export default InputDropdown;
