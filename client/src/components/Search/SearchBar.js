import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.scss';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            dataList: null
        };
    }

    handleInputChange = (e) => { this.props.handleInputChange(e.target.value); }

    render () {
        return (
            <div className={`search-bar ${this.props.className}`}>
                <div className="search-field">
                    <input
                        id='searchInput'
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.handleInputChange}
                        onBlur={this.props.onBlur}
                        value={this.props.inputValue}
                    />
                    <label htmlFor='searchInput' onMouseUp={this.props.handleIconClick} >
                        {this.props.icon}
                    </label>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    handleIconClick: PropTypes.func,
    className: PropTypes.string
};

export default SearchBar;
