import React from 'react';
import Client from '../../../../components/Client';
import './UserSelector.scss';
import SuggestionList from '../SuggestionList/SuggestionList';

class UserSelector extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            rawUserData: null,
            suggestions: null,
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        };
    }

    onChange = (e) => {
        const { suggestions } = this.state;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter((suggestion) => {
            return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
        });

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    }

    onClick = (e) => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
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
        console.log(result);
    }

    render () {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        return (
            <div className="selector">
                <input id="selectedUser" onChange = {onChange} ></input>
                {showSuggestions && userInput ? <SuggestionList names={filteredSuggestions}></SuggestionList> : null}
                <button>This is not doing anything yet</button>
            </div>
        );
    }
}

export default UserSelector;
