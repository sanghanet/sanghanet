import React, { Component } from 'react';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userNames: [],
            foundUsers: [],
            inputValue: ''
        };
    }

    userList = [];

    fetchData = () => {
        fetch('http://localhost:4000/userList', { method: 'GET' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                const names = [];
                data.forEach(user => {
                    names.push(this.getFullName(user));
                });
                this.setState({ userNames: names });
                console.dir(this.state.userNames);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    debugger;

    onSearchClick = () => {
        this.fetchData();
        this.handleSearch(this.state.inputValue, this.state.userNames);
    }

    getFullName = (user) => {
        return [user.first_name, user.last_name].join(' ');
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    find = (searchValue, searchList) => {
        return new Promise((resolve, reject) => {
            this.setState({ foundUsers: null });
            const found = [];
            for (let i = 0; i < searchList.length; i++) {
                if (searchList[i].includes(searchValue)) {
                    console.log('updated person');
                    found.push(searchList[i]);
                };
            }
            this.setState({ foundUsers: found });
            resolve(this.state.foundUsers);
        });
    }

    handleSearch = (searchValue, searchList) => {
        this.find(searchValue, searchList).then((value) => {
            console.dir(value);
        });
    }

    render () {
        return (
            <div>
                <div className="user-search">
                    <input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="button"
                        value="Search"
                        onClick={this.onSearchClick}
                    />
                </div>
                <div>{this.state.test}</div>
            </div>
        );
    }
}

export default Home;
