import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.scss';
import { ReactComponent as Search } from '../icons/search.svg';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            dataList: null
        };
    }

    handleInputChange = (e) => {
        this.props.handleInputChange(e.target.value);
    }

    handleSearch = () => {
        this.props.handleSearch();
    }

    render () {
        return (
            <div className="search-field d-none d-md-flex">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleInputChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.props.inputValue}
                />
                <button
                    onClick={this.handleSearch}
                >
                    <Search />
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired
};

export default SearchBar;
