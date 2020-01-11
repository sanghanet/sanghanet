import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: ''
        };
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

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleSearch = (users) => {
        const userNames = users.map((user) => {
            return `${user.first_name} ${user.last_name}`;
        });

        const foundUsers = userNames.filter(name => name.includes(this.state.inputValue));

        console.dir(foundUsers);
    }

    render () {
        return (
            <div>
                <input
                    type="text"
                    name="searchUsers"
                    onChange={this.handleInputChange}
                    value={this.state.inputValue}
                    className={this.props.inputClassName}
                />
                <button
                    onClick={this.fetchData}
                    className={this.props.buttonClassName}
                >
                    {this.props.buttonValue}
                </button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    // in case inner JSX elements need to be styled when element is reused
    inputClassName: PropTypes.string,
    buttonClassName: PropTypes.string,
    buttonValue: PropTypes.string
};

export default SearchBar;
