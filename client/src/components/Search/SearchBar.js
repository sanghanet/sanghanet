import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import './SearchBar.scss';

class SearchBar extends Component {
    handleInputChange = (e) => { this.props.handleInputChange(e.target.value); }

    renderSearchResults = (results) => {
        return (
            <div className="searchResults">
                <ul>
                    {(results.length) ? (
                        results.map((user, key) => {
                            return (
                                <li key={key} >
                                    {user.spiritualName === 'None' ? `${user.firstName} ${user.lastName}` : user.spiritualName}
                                </li>
                            );
                        })
                    ) : (<li>User not found</li>)}
                </ul>
            </div>
        );
    }

    render () {
        const {
            className,
            controlId,
            placeholder,
            inputValue,
            handleIconClick,
            icon,
            searchResults,
            onBlur
        } = this.props;

        return (
            <div className={`search-bar ${className}`}>
                <Form.Group controlId={controlId} className={'search-field'}>
                    <Form.Control
                        type="text"
                        placeholder={placeholder}
                        onChange={this.handleInputChange}
                        onBlur={onBlur}
                        value={inputValue}
                    />
                    <Form.Label onClick={handleIconClick} >
                        {icon}
                    </Form.Label>
                </Form.Group>
                {searchResults && this.renderSearchResults(searchResults)}
            </div>
        );
    }
}

SearchBar.propTypes = {
    controlId: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    handleIconClick: PropTypes.func,
    searchResults: PropTypes.array,
    className: PropTypes.string
};

export default SearchBar;
