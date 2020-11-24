import React from 'react';
import Client from '../../../../components/Client';
import './UserSelector.scss';
import PropTypes from 'prop-types';

class UserSelector extends React.Component {
        state = {
            rawUserData: null,
            suggestions: null,
            searchResults: [],
            showSuggestions: false,
            userInput: '',
            warningMessage: '',
            buttonDisabled: true,
            indexOfActiveItem: 0,
            selectedUser: 'No user selected'
        };

    onKeyPress = async (e) => {
        let { indexOfActiveItem: index, searchResults, showSuggestions } = this.state;
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault();
        }
        if (e.keyCode === 38 && index) {
            index--;
            this.setState({ indexOfActiveItem: index });
        };
        if (e.keyCode === 40 && index < searchResults.length - 1) {
            index++;
            this.setState({ indexOfActiveItem: index });
        }
        if (e.keyCode === 13 && showSuggestions) {
            await this.setState({
                showSuggestions: false,
                userInput: searchResults[index],
                searchResults: [],
                indexOfActiveItem: 0
            });
            document.getElementById('selectedUser').value = searchResults[index];
            this.onSubmit();
        } else if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    onInputChange = (e) => {
        const maxDisplayedSuggestions = 10;
        const { state: { suggestions, indexOfActiveItem: index } } = this;
        const userInput = e.currentTarget.value;

        let searchResults = suggestions.filter((suggestion) => {
            return userInput && suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        if (searchResults.length > maxDisplayedSuggestions) {
            searchResults = searchResults.slice(0, maxDisplayedSuggestions);
        }

        let newActiveIndex;

        if (searchResults.length && searchResults.length <= index) {
            newActiveIndex = searchResults.length - 1;
            if (newActiveIndex < 0) newActiveIndex = 0;
        } else {
            newActiveIndex = index;
        }

        this.setState({
            searchResults: searchResults,
            showSuggestions: searchResults.length && true,
            userInput: e.currentTarget.value,
            warningMessage: '',
            buttonDisabled: !userInput,
            indexOfActiveItem: newActiveIndex
        });
    }

    onSuggestionClick = async (e) => {
        await this.setState({
            searchResults: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });

        this.onSubmit();
    }

    onSubmit = () => {
        const inputValue = document.getElementById('selectedUser').value;

        if (inputValue) {
            const selectedUserName = inputValue;
            const selectedUserObject = this.state.rawUserData.find((item) => {
                return item.userName === selectedUserName;
            });
            if (selectedUserObject) {
                const selectedEmail = selectedUserObject.email;
                this.setState({
                    searchResults: [],
                    showSuggestions: false,
                    userInput: '',
                    buttonDisabled: true,
                    selectedUser: selectedUserName
                });
                this.props.handleSubmit(selectedEmail, selectedUserObject.userName);
            } else {
                this.setState({
                    warningMessage: 'Please select a valid user!',
                    userInput: '',
                    buttonDisabled: true
                });
            }
        }
    }

    componentDidMount () {
        this.getUserList();
    }

    getUserList = async () => {
        const result = await Client.fetch('/finance/userlist');
        const nameList = result.map((user) => {
            return user.userName;
        });

        this.setState({
            rawUserData: result,
            suggestions: nameList
        });
    }

    SuggestionList = () => {
        return (
            <ul>
                {this.state.searchResults.map((name, index) => {
                    const { indexOfActiveItem } = this.state;
                    return <li key={name} onClick = {this.onSuggestionClick} className = {index === indexOfActiveItem ? 'activated' : ''} >{name}</li>;
                })}
            </ul>
        );
    };

    render () {
        const {
            onInputChange,
            SuggestionList,
            onKeyPress,
            state: {
                showSuggestions,
                userInput,
                warningMessage,
                selectedUser
            }
        } = this;

        return (
            <div className="selector">
                <input id="selectedUser" autoComplete="off" onChange = {onInputChange} value={userInput} onKeyDown={onKeyPress} ></input>
                {showSuggestions && userInput ? <SuggestionList></SuggestionList> : null}
                <div className = "user-info">{selectedUser}</div>
                <span>{warningMessage}</span>
            </div>
        );
    }
}

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
