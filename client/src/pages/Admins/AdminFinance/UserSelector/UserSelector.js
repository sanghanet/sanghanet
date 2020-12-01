import React, { useEffect, useRef, useState } from 'react';
import Client from '../../../../components/Client';
import './UserSelector.scss';
import PropTypes from 'prop-types';

const UserSelector = (props) => {
    const [rawUserData, setRawUserData] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [indexOfActiveItem, setIndexOfActiveItem] = useState(0);
    const [selectedUser, setSelectedUser] = useState('No user selected');

    const inputRef = useRef();

    const onKeyPress = async (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault();
        }
        if (e.keyCode === 38 && indexOfActiveItem) {
            setIndexOfActiveItem(indexOfActiveItem - 1);
        };
        if (e.keyCode === 40 && indexOfActiveItem < searchResults.length - 1) {
            setIndexOfActiveItem(indexOfActiveItem + 1);
        }
        if (e.keyCode === 13) {
            if (showSuggestions) {
                setShowSuggestions(false);
                setSearchResults([]);
                setUserInput(searchResults[indexOfActiveItem]);
                setIndexOfActiveItem(0);

                inputRef.current.value = searchResults[indexOfActiveItem];
            }
            onSubmit();
        }
    };

    const onInputChange = (e) => {
        const maxDisplayedSuggestions = 10;
        const inputValue = e.currentTarget.value;
        const filterRegex = new RegExp(`(^|\\s)${inputValue.toLowerCase()}`);

        let filteredResults = suggestions.filter((suggestion) => {
            return inputValue && suggestion.toLowerCase().match(filterRegex);
        });

        if (filteredResults.length > maxDisplayedSuggestions) {
            filteredResults = filteredResults.slice(0, maxDisplayedSuggestions);
        }

        let newActiveIndex;

        if (filteredResults.length && filteredResults.length <= indexOfActiveItem) {
            newActiveIndex = filteredResults.length - 1;
            if (newActiveIndex < 0) newActiveIndex = 0;
        } else {
            newActiveIndex = indexOfActiveItem;
        }

        setShowSuggestions(filteredResults.length && true);
        setSearchResults(filteredResults);
        setUserInput(e.currentTarget.value);
        setWarningMessage('');
        setIndexOfActiveItem(newActiveIndex);
    };

    const onSuggestionClick = async (e) => {
        await setUserInput(e.currentTarget.innerText);
        setSearchResults([]);
        setShowSuggestions(false);

        onSubmit();
    };

    const onSubmit = () => {
        const inputValue = inputRef.current.value;

        if (inputValue) {
            const selectedUserName = inputValue;
            const selectedUserObject = rawUserData.find((item) => {
                return item.userName === selectedUserName;
            });
            if (selectedUserObject) {
                const selectedEmail = selectedUserObject.email;
                setShowSuggestions(false);
                setSearchResults([]);
                setUserInput('');
                setSelectedUser(selectedUserName);
                props.handleSubmit(selectedEmail, selectedUserObject.userName);
            } else {
                setUserInput('');
                setWarningMessage('Please select a valid user!');
            }
        }
    };

    useEffect(() => {
        getUserList();
        inputRef.current.focus();
    }, []);

    const getUserList = async () => {
        const result = await Client.fetch('/finance/userlist');
        const nameList = result.map((user) => user.userName);

        setRawUserData(result);
        setSuggestions(nameList.sort());
    };

    const SuggestionList = () => {
        return (
            <ul>
                {searchResults.map((name, index) => {
                    return <li key={name} onClick = {onSuggestionClick} className = {index === indexOfActiveItem ? 'activated' : ''} >{name}</li>;
                })}
            </ul>
        );
    };

    return (
        <div className="selector">
            <input id="selectedUser" autoComplete="off" onChange = {onInputChange} value={userInput} onKeyDown={onKeyPress} ref={inputRef}></input>
            {showSuggestions && userInput ? <SuggestionList></SuggestionList> : null}
            <div className = "user-info">{selectedUser}</div>
            <span>{warningMessage}</span>
        </div>
    );
};

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
