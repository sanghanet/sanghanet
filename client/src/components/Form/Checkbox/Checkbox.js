import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

const Checkbox = (props) => {
    return (
        <div id={props.id} onClick={props.handleChange} className={props.checked ? 'checked' : 'unchecked'}>
            {props.value}
        </div>
    );
};

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string
};

export default Checkbox;
