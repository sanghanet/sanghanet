import React from 'react';
import PropTypes from 'prop-types';
import './CustomDateInput.scss';
// https://www.npmjs.com/package/react-datepicker
// Source: https://github.com/Hacker0x01/react-datepicker/issues/862
// For TS: https://github.com/Hacker0x01/react-datepicker/issues/2165

interface CustomDateInputProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    value?: string
};

const CustomDateInput: React.FC<CustomDateInputProps> = ({ onClick, value }) => {
    return <button type="button" onClick={onClick}>{value}</button>;
};

CustomDateInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default CustomDateInput;
