import React, { useEffect, useRef, useState, useContext } from 'react';
import Client from '../../../../components/Client';
import { Form } from 'react-bootstrap';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import PropTypes from 'prop-types';
import './UserSelector.scss';

interface UserSelectorProps {
    handleSubmit: (email: string, userName: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ handleSubmit }) => {
    const [rawUserData, setRawUserData] = useState<UserOfFinanceUserSelector[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [indexOfActiveItem, setIndexOfActiveItem] = useState<number>(0);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const { SELECT, UNSELECTEDMSG } = useContext(UIcontext).dictionary.userSelector;

    const inputRef = useRef<HTMLInputElement>(null);

    const maxDisplayedSuggestions = 10;

    const onSubmit = (): void => {
        const inputValue = (inputRef && inputRef.current) ? inputRef.current.value : undefined;

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
                handleSubmit(selectedEmail, selectedUserObject.userName);
            } else {
                setUserInput('');
            }
        }
    };

    const onKeyPress: React.KeyboardEventHandler = (e) => {
        const { key } = e;

        if (key === 'ArrowUp' || key === 'ArrowDown') {
            e.preventDefault();
        }

        if (key === 'ArrowUp' && indexOfActiveItem) {
            setIndexOfActiveItem(indexOfActiveItem - 1);
        }

        if (key === 'ArrowDown' && indexOfActiveItem < searchResults.length - 1) {
            setIndexOfActiveItem(indexOfActiveItem + 1);
        }

        if (key === 'Enter') {
            e.preventDefault();

            if (showSuggestions) {
                setShowSuggestions(false);
                setSearchResults([]);
                setUserInput(searchResults[indexOfActiveItem]);
                setIndexOfActiveItem(0);
                if (inputRef && inputRef.current) {
                    inputRef.current.value = searchResults[indexOfActiveItem];
                }
            }
            onSubmit();
        }
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const inputValue: string = e.currentTarget.value;

        const compareStrings = (input: string, libraryValue: string): boolean => {
            const normalize = (x: string): string => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const stdInput = normalize(input);
            const stdLibValue = normalize(libraryValue);
            return !!stdLibValue.match(new RegExp(`(^|\\s)${stdInput}`));
        };

        let filteredResults: Array<string> = suggestions.filter((suggestion) => compareStrings(inputValue, suggestion));
        filteredResults = filteredResults.slice(0, maxDisplayedSuggestions);

        const length: number = filteredResults.length;
        const newActiveIndex: number = (length && length <= indexOfActiveItem) ? Math.max(0, length - 1) : indexOfActiveItem;

        setShowSuggestions(!!length);
        setSearchResults(filteredResults);
        setUserInput(inputValue);
        setIndexOfActiveItem(newActiveIndex);
    };

    const onSuggestionClick: React.MouseEventHandler<HTMLLIElement> = async (e) => {
        await setUserInput(e.currentTarget.innerText);
        setSearchResults([]);
        setShowSuggestions(false);

        onSubmit();
    };

    useEffect(() => {
        const getUserList = async (): Promise<void> => {
            const result: Array<UserOfFinanceUserSelector> = await Client.fetch('/finance/userlist');
            const nameList = result.map((user: UserOfFinanceUserSelector) => user.userName);

            setRawUserData(result);
            setSuggestions(nameList.sort());
        };

        getUserList();
        inputRef && inputRef.current && inputRef.current.focus();
    }, []);

    const SuggestionList = () => {
        return (
            <ul>
                {searchResults.map((name, index) => {
                    const active = index === indexOfActiveItem;
                    return (
                        <li key={name} onClick={onSuggestionClick} className={active ? 'activated' : ''} >
                            {name}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="selector">
            <div className="user-info">{selectedUser || UNSELECTEDMSG}</div>
            <div>
                <Form>
                    <Form.Control
                        className="input"
                        id="selectedUser"
                        placeholder={SELECT}
                        autoComplete="off"
                        onChange={onInputChange}
                        value={userInput}
                        onKeyDown={onKeyPress}
                        ref={inputRef}
                    />
                </Form>
                {showSuggestions && userInput ? <SuggestionList /> : null}
            </div>
        </div>
    );
};

UserSelector.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default UserSelector;
