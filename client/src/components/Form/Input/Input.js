import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

import { Form } from 'react-bootstrap';

class Input extends Component {
    render () {
        const isSelect = this.props.type === 'select';

        return (
            <Form.Group>
                <Form.Label>{this.props.inputTitle}</Form.Label>
                {!isSelect && (
                    <Form.Control
                        type={this.props.type}
                        id="firstName"
                        name="firstName"
                        placeholder={this.props.placeholder}
                        value={this.props.inputValue}
                        required
                    >
                    </Form.Control>
                )}
                {isSelect && (
                    <Form.Control
                        as='select'
                        id="firstName"
                        placeholder={this.props.placeholder}
                        required
                    >
                        {this.props.optionsForSelect.map((option, index) => {
                            return <option key={index}>{option}</option>;
                        })}
                    </Form.Control>
                )}
            </Form.Group>
        );
    }
}

Input.propTypes = {
    inputTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    optionsForSelect: PropTypes.array,
    inputValue: PropTypes.string
};

export default Input;
