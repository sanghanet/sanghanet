import React from 'react';
import Client from '../../../../components/Client';
import './UserSelector.scss';
import PropTypes from 'prop-types';

class UserSelector extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rawUserData: null,
            suggestions: null,
            searchResults: [],
            showSuggestions: false,
            userInput: '',
            warningMessage: '',
            buttonDisabled: true
        };
        this.maxDisplayedSuggestions = 10;
    }

    onInputChange = (e) => {
        const { state: { suggestions }, maxDisplayedSuggestions } = this;
        const userInput = e.currentTarget.value;

        let searchResults = suggestions.filter((suggestion) => {
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        if (searchResults.length > maxDisplayedSuggestions) {
            searchResults = searchResults.slice(0, maxDisplayedSuggestions);
        }

        this.setState({
            searchResults: searchResults,
            showSuggestions: true,
            userInput: e.currentTarget.value,
            warningMessage: '',
            buttonDisabled: !userInput
        });
    }

    onSuggestionClick = (e) => {
        this.setState({
            searchResults: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
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
                    buttonDisabled: true
                });
                this.props.handleSubmit(selectedEmail);
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
                {this.state.searchResults.map((name) => {
                    return <li key={name} onClick = {this.onSuggestionClick}>{name}</li>;
                })}
            </ul>
        );
    };

    render () {
        const {
            onInputChange,
            onSubmit,
            SuggestionList,
            state: {
                showSuggestions,
                userInput,
                warningMessage,
                buttonDisabled
            }
        } = this;

        return (
            <div className="selector">
                <input id="selectedUser" autoComplete="off" onChange = {onInputChange} value={userInput} ></input>
                {showSuggestions && userInput ? <SuggestionList></SuggestionList> : null}
                <button onClick = {onSubmit} disabled = {buttonDisabled}>Select</button>
                <span>{warningMessage}</span>
            </div>
        );
    }
}

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
