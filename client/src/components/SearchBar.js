import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Search } from './icons/search.svg';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    onEnter = e => {
        if (e.keyCode === 13) {
            if (this.state.inputValue !== '') {
                this.fetchData();
            }
        }
    }

    onFocus = (e) => {
        e.target.addEventListener('keyup', this.onEnter);
    }

    onBlur = (e) => {
        e.target.removeEventListener('keyup', this.onEnter);
    }

    fetchData = () => {
        fetch('http://localhost:4000/userList', { method: 'GET' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ dataList: data });
                this.handleSearch(data);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    handleSearch = (users) => {
        const userNames = users.map((user) => {
            return `${user.firstName} ${user.lastName}`;
        });

        const foundUsers = userNames.filter(name => name.toLowerCase().includes(this.state.inputValue.toLowerCase()));

        console.dir(foundUsers);
    }

    render () {
        return (
            <div className="search-field">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleInputChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.state.inputValue}
                    className={this.props.inputClassName}
                />
                <button
                    onClick={this.fetchData}
                    className={this.props.buttonClassName}
                >
                    <Search />
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    // in case inner JSX elements need to be styled when element is reused
    inputClassName: PropTypes.string,
    buttonClassName: PropTypes.string
};

export default SearchBar;
