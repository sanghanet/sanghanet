import React from 'react';
import Client from '../../../../components/Client';
import './UserSelector.scss';
import SuggestionList from '../SuggestionList/SuggestionList';
import PropTypes from 'prop-types';

class UserSelector extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rawUserData: null,
            suggestions: null,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: '',
            inputPlaceholder: 'Enter username ...'
        };
        this.maxDisplayedSuggestions = 10;
    }

    onChange = (e) => {
        const { suggestions } = this.state;
        const userInput = e.currentTarget.value;

        let filteredSuggestions = suggestions.filter((suggestion) => {
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        if (filteredSuggestions.length > this.maxDisplayedSuggestions) {
            filteredSuggestions = filteredSuggestions.slice(0, this.maxDisplayedSuggestions);
        }

        this.setState({
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    }

    onClick = (e) => {
        this.setState({
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    }

    onSubmit = () => {
        if (document.getElementById('selectedUser').value) {
            const selectedUserName = document.getElementById('selectedUser').value;
            const selectedUserObject = this.state.rawUserData.find((item) => {
                return item.userName === selectedUserName;
            });
            if (selectedUserObject) {
                const selectedEmail = selectedUserObject.email;
                this.setState({
                    filteredSuggestions: [],
                    showSuggestions: false,
                    userInput: '',
                    inputPlaceholder: 'Enter username ...'
                });
                this.props.handleSubmit(selectedEmail);
            } else {
                this.setState({
                    userInput: '',
                    inputPlaceholder: 'Invalid username!'
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

    render () {
        const {
            onChange,
            onClick,
            onSubmit,
            state: {
                filteredSuggestions,
                showSuggestions,
                userInput,
                inputPlaceholder
            }
        } = this;

        return (
            <div className="selector">
                <input id="selectedUser" autoComplete="off" placeholder={inputPlaceholder} onChange = {onChange} value={userInput} ></input>
                {showSuggestions && userInput ? <SuggestionList names={filteredSuggestions} handleOnClick = {onClick}></SuggestionList> : null}
                <button onClick = {onSubmit}>Select</button>
            </div>
        );
    }
}

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;