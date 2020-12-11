import React, { useState, useEffect, useContext } from 'react';
import Client from '../../../../components/Client';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import PropTypes from 'prop-types';
import './UserSelector.scss';

const UserSelector = (props) => {
    const [rawUserData, setRawUserData] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [indexOfActiveItem, setIndexOfActiveItem] = useState(0);
    const [selectedUser, setSelectedUser] = useState('No user selected');

    const onSubmit = () => {
        const inputValue = document.getElementById('selectedUser').value;

        if (inputValue) {
            const selectedUserName = inputValue;

            const selectedUserObject = rawUserData.find((item) => {
                return item.userName === selectedUserName;
            });

            if (selectedUserObject) {
                const selectedEmail = selectedUserObject.email;

                setSearchResults([]);
                setShowSuggestions(false);
                setSelectedUser(selectedUserName);

                props.handleSubmit(selectedEmail, selectedUserObject.userName);
            } else {
                setShowWarning(true);
            }

            setUserInput('');
            setButtonDisabled(true);
        }
    }

    const onKeyPress = (e) => {
        // up or down arrow
        if (e.keyCode === 38 || e.keyCode === 40) { e.preventDefault(); }

        // up arrow
        if (e.keyCode === 38 && indexOfActiveItem) {
            setIndexOfActiveItem((prevIndex) => prevIndex-1);
        };

        // down arrow
        if (e.keyCode === 40 && indexOfActiveItem < searchResults.length - 1) {
            setIndexOfActiveItem((prevIndex) => prevIndex+1);
        }

        // enter
        if (e.keyCode === 13 && showSuggestions) {
            setShowSuggestions(false);
            setUserInput(searchResults[indexOfActiveItem]);
            setSearchResults([]);

            document.getElementById('selectedUser').value = searchResults[indexOfActiveItem];

            onSubmit();
        } else if (e.keyCode === 13) {
            onSubmit();
        }
    }

    useEffect(() => {
        setIndexOfActiveItem(0);
    }, [userInput]);

    const onInputChange = (e) => {
        const maxDisplayedSuggestions = 10;
        const { index } = indexOfActiveItem;
        const userInput = e.currentTarget.value;

        let searchResults = suggestions.filter((suggestion) => {
            return userInput && suggestion.toLowerCase().includes(userInput.toLowerCase());
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

        setSearchResults(searchResults);
        setShowSuggestions(searchResults.length && true);
        setUserInput(e.currentTarget.value);
        setShowWarning(false);
        setButtonDisabled(!userInput);
        setIndexOfActiveItem(newActiveIndex);
    }

    const onSuggestionClick = (e) => {
        setSearchResults([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
    }

    const getUserList = async () => {
        const result = await Client.fetch('/finance/userlist');

        const nameList = result.map((user) => {
            return user.userName;
        });

        setRawUserData(result);
        setSuggestions(nameList);
    }

    const SuggestionList = () => {
        return (
            <ul>
                {searchResults.map((name, index) => {
                    return <li key={name} onClick = {onSuggestionClick} className = {index === indexOfActiveItem ? 'activated' : ''} >{name}</li>;
                })}
            </ul>
        );
    };

    useEffect(() => {
        getUserList();
    }, []);

    const { SELECT, INVALIDUSERSELECTMESSAGE } = useContext(UIcontext).dictionary.userSelector;

    return (
        <div className="selector">
            <input id="selectedUser" autoComplete="off" onChange = {onInputChange} value={userInput} onKeyDown={onKeyPress}></input>
            {showSuggestions && userInput ? <SuggestionList></SuggestionList> : null}
            <button onClick = {onSubmit} disabled = {buttonDisabled}>{SELECT}</button>
            <div className = "user-info">{selectedUser}</div>
            <span className={`warning-message${showWarning ? ' visible' : ''}`}>{INVALIDUSERSELECTMESSAGE}</span>
        </div>
    );
}

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
