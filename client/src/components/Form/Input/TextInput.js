import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextInput extends Component {
    render () {
        return (
            <div className="personal-form-field">
                <label htmlFor="firstName">{this.props.inputTitle}</label>
                <input type="text" id="firstName" name="firstName" required></input>
            </div>
        );
    }
}

TextInput.propTypes = {
    inputTitle: PropTypes.string
};

export default TextInput;
