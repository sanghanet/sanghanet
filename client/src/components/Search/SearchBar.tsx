import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import './SearchBar.scss';

interface SearchBarProps {
    controlId: string;
    handleInputChange: (value: string) => void;
    inputValue: string;
    className?: string;
    placeholder?: string;
    handleIconClick?: React.MouseEventHandler<HTMLLabelElement>;
    icon?: ReactElement;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    onKeyDown?: React.KeyboardEventHandler;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
    const {
        className,
        controlId,
        placeholder,
        inputValue,
        handleIconClick,
        handleInputChange,
        icon,
        onBlur,
        disabled,
        onKeyDown
    } = props;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => { handleInputChange(event.target.value); };

    return (
        <div className={`search-bar ${className}`}>
            <Form.Group controlId={controlId} className="search-field">
                <Form.Control
                    type="text"
                    className="custom"
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={onBlur}
                    value={inputValue}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                />
                <Form.Label onClick={handleIconClick} >
                    {icon}
                </Form.Label>
            </Form.Group>
        </div>
    );
};

SearchBar.propTypes = {
    controlId: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    handleIconClick: PropTypes.func,
    disabled: PropTypes.bool,
    onKeyDown: PropTypes.func,
    className: PropTypes.string
};

export default SearchBar;
