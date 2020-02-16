import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

import { Form } from 'react-bootstrap';

class TextInput extends Component {
    render () {
        return (
            <Form.Group>
                <Form.Label htmlFor="firstName">{this.props.inputTitle}</Form.Label>
                <Form.Control type="text" id="firstName" name="firstName" required></Form.Control>
            </Form.Group>
        );
    }
}

TextInput.propTypes = {
    inputTitle: PropTypes.string
};

export default TextInput;
