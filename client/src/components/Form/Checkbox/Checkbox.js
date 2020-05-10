import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import './Checkbox.scss';

const Checkbox = (props) => {
    return (
        <Button variant={props.checked ? 'primary' : 'outline-primary'} id={props.id} onClick={props.handleChange} className='checkbox'>
            {props.value}
        </Button>
    );
};

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string
};

export default Checkbox;
