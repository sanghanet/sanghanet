import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import './Checkbox.scss';

interface CheckboxProps {
    checked: boolean;
    id: ADMIN_ROLE;
    handleChange: React.MouseEventHandler<HTMLButtonElement>;
    value: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, id, handleChange, value }) => {
    return (
        <Button variant={checked ? 'primary' : 'outline-primary'} id={id} onClick={handleChange} className="checkbox">
            {value}
        </Button>
    );
};

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.oneOf<ADMIN_ROLE>([
        'filterSuperuser',
        'filterFinanceAdmin',
        'filterEventAdmin',
        'filterYogaAdmin',
        'filterNoRole']).isRequired
};

export default Checkbox;
