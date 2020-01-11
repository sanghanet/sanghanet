import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
        console.dir(this.state.inputValue);
    }

    render () {
        return (
            <div>
                <input
                    type="text"
                    name="searchUsers"
                    onChange={this.handleInputChange}
                    value={this.state.inputValue}
                />
                <button onClick={this.props.searchAction}>Search</button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    searchAction: PropTypes.func
};

export default SearchBar;
