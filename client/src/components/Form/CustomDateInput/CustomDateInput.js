import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CustomDateInput.scss';
// https://www.npmjs.com/package/react-datepicker
// Source: https://github.com/Hacker0x01/react-datepicker/issues/862

class CustomDateInput extends Component {
    render () {
        const { onClick, value } = this.props;
        return <button type="button" onClick={onClick}>{value}</button>;
    }
}

CustomDateInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default CustomDateInput;
