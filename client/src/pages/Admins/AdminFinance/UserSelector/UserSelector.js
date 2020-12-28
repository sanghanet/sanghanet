import React, { useState, useEffect, useRef, useContext } from 'react';
import Client from '../../../../components/Client';
import { Form } from 'react-bootstrap';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import PropTypes from 'prop-types';
import './UserSelector.scss';

const UserSelector = (props) => {
    const [rawUserData, setRawUserData] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [indexOfActiveItem, setIndexOfActiveItem] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);

    const { SELECT, UNSELECTEDMSG } = useContext(UIcontext).dictionary.userSelector;

    const inputRef = useRef();

    const maxDisplayedSuggestions = 10;

    const onKeyPress = (e) => {
        // on up or down arrow
        if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault();

        // on up arrow
        if (e.keyCode === 38 && indexOfActiveItem) setIndexOfActiveItem(indexOfActiveItem - 1);

        // on down arrow
        if (e.keyCode === 40 && indexOfActiveItem < searchResults.length - 1) {
            setIndexOfActiveItem(indexOfActiveItem + 1);
        }

        // on enter
        if (e.keyCode === 13) {
            e.preventDefault();

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
        const inputValue = e.currentTarget.value;

        const compareStrings = (input, libraryValue) => {
            const stdInput = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const stdLibValue = libraryValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            return stdLibValue.match(new RegExp(`(^|\\s)${stdInput}`)) && true;
        };

        let filteredResults = suggestions ? suggestions.filter((suggestion) => compareStrings(inputValue, suggestion)) : null;

        if (filteredResults !== null && filteredResults.length > maxDisplayedSuggestions) {
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
        setUserInput(inputValue);
        setShowWarning(false);
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
                setShowWarning(true);
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
                    const active = index === indexOfActiveItem;
                    return (<li key={name} onClick = {onSuggestionClick} className = {active ? 'activated' : ''} >
                        <button className={`${active ? 'selected ' : ''}neomorph`}>{name}</button>
                    </li>);
                })}
            </ul>
        );
    };

    return (
        <div className="selector">
            <div className = "user-info">{selectedUser || UNSELECTEDMSG}</div>
            <div>
                <Form>
                    <Form.Control
                        className="input"
                        id="selectedUser"
                        placeholder={SELECT}
                        autoComplete="off"
                        onChange = {onInputChange}
                        value={userInput}
                        onKeyDown={onKeyPress}
                        ref={inputRef}
                    />
                </Form>
                {showSuggestions && userInput ? <SuggestionList></SuggestionList> : null}
                {showWarning && <span>asdf</span> }
            </div>
        </div>
    );
};

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
