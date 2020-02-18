import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputDropdown.scss';

import { Col, Accordion } from 'react-bootstrap';

class InputDropdown extends Component {
    render () {
        const { headerInput, bodyInputs } = this.props;

        const preventToggle = (e) => {
            e.preventDefault();
        };

        return (
            <Col xm={12} lg={6}>
                <Accordion className="input-dropdown">
                    <Accordion.Toggle onClick={this.preventToggle}>
                        {headerInput}
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        <div>
                            {bodyInputs.map((input) => { return input; })}
                        </div>
                    </Accordion.Collapse>
                </Accordion>
            </Col>
        );
    }
}

InputDropdown.propTypes = {
    headerInput: PropTypes.element.isRequired,
    bodyInputs: PropTypes.array.isRequired
};

export default InputDropdown;
