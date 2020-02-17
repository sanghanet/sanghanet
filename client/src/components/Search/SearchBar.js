import React, { Component } from "react";
import PropTypes from "prop-types";

import "./SearchBar.scss";
import { ReactComponent as Search } from "../icons/search.svg";

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: "",
            dataList: null
        };
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    onEnter = (e) => {
        if (e.keyCode === 13) {
            if (this.state.inputValue !== "") {
                this.handleSearch();
            }
        }
    }

    onFocus = (e) => {
        e.target.addEventListener("keyup", this.onEnter);
    }

    onBlur = (e) => {
        e.target.removeEventListener("keyup", this.onEnter);
    }

    handleSearch = () => {
        const users = this.state.dataList;
        let userNames = null;
        let foundUsers = null;

        if (this.state.inputValue !== "") {
            userNames = users.map((user) => {
                return `${user.firstName} ${user.lastName}`;
            });

            foundUsers = userNames.filter((name) => name.toLowerCase().includes(this.state.inputValue.toLowerCase()));

            this.setState({ inputValue: "" });

            console.dir(foundUsers);
        }
    }

    componentDidMount () {
        fetch("http://localhost:4000/userList")
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.setState({ dataList: data });
            }).catch((err) => {
                throw new Error(err.message);
            });
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
                    value={this.state.inputValue}
                    className={this.props.inputClassName}
                />
                <button
                    onClick={this.handleSearch}
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
