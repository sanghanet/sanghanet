import React, { useContext, useState, useEffect, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './Header.scss';
import Alert from '../Alert/Alert';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../Search/SearchBar';
import MemberDetails from '../MemberDetails/MemberDetails';
import ActiveUserNameWrapper from '../NameWrappers/ActiveUserName/ActiveUserNameWrapper';
import AnyUserNameWrapper from '../NameWrappers/AnyUserName/AnyUserNameWrapper';

import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as HamburgerIcon } from '../icons/hamburger-icon.svg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';

import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { DataContext } from '../contexts/DataContext/DataContext';

import Client from '../Client';
import { FormLabel } from 'react-bootstrap';

const Header: React.FC<RouteComponentProps> = ({ location, history }: RouteComponentProps) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<ALERT>('NOALERT');

    const displayAlert = (visible: boolean, msg: string, type: ALERT): void => {
        setShowAlert(visible);
        setAlertMessage(msg);
        setAlertType(type);
    };

    const closeAlert = (): void => { displayAlert(false, '', 'NOALERT'); };
    const { isHamburgerOpen, toggleHamburger, setAccess } = useContext(UIcontext);
    const { userName, setUsername, avatarSrc, setAvatarSrc } = useContext(DataContext);

    useEffect(() => {
        Client.fetch('/user/personal')
            .then((data) => {
                // used in header to show user's name
                setUsername(data[0].firstName, data[0].lastName);
                setAvatarSrc(data[0].profileImg);

                setAccess(
                    data[1].isSuperuser,
                    data[1].isFinanceAdmin,
                    data[1].isEventAdmin,
                    data[1].isYogaAdmin
                );
            }).catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    }, [setAccess, setUsername, setAvatarSrc]);

    const [searchBarValue, setSearchBarValue] = useState('');
    const [nameOfUsers, setNameOfUsers] = useState<NameOfUsers[]>([]);
    const [searchResults, setSearchResults] = useState<NameOfUsers[] | null>(null);
    const [searching, setSearching] = useState(false);
    const [showMemberDialog, setShowMemberDialog] = useState(false);
    const [memberDialogData, setMemberDialogData] = useState<RegisteredUserType | null>(null);

    const [activePage, setActivePage] = useState('');
    const { pageAndNavbarTitles, alert } = useContext(UIcontext).dictionary;

    useEffect(() => {
        const url = location.pathname;
        const activePageName = url.substring(url.lastIndexOf('/') + 1);
        let pageNameCapitalized = activePageName.charAt(0).toUpperCase() + activePageName.slice(1);
        pageNameCapitalized += url.includes('/app/admin') && !url.includes('/superuser') ? '_Admin' : '';

        setActivePage(pageAndNavbarTitles[pageNameCapitalized.toUpperCase()]);
    }, [location, pageAndNavbarTitles]);

    const handleAvatarClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
        if (location.pathname !== '/app/personal') {
            history.push('/app/personal');
        }
    };

    const handleHamburgerClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation(); // w/o this, bubbling event immediately close the menu in App.js!
        toggleHamburger();
    };

    const getSearchResults = useCallback(() => {
        if (searchBarValue.length === 0) return null;
        const searchResults = nameOfUsers.filter((user) => {
            const userName = `${user.firstName} ${user.lastName}`;
            return (
                userName.toLowerCase().includes(searchBarValue.toLowerCase()) ||
                user.spiritualName.toLowerCase().includes(searchBarValue.toLowerCase())
            );
        });
        return searchResults;
    }, [searchBarValue, nameOfUsers]);

    /*  Setting the state in 'handleSearchInputChange' is asynchronous
        and this is how we listen to its completion */
    useEffect(() => {
        setSearchResults(getSearchResults());
    }, [searchBarValue, getSearchResults]);

    // componentDidMount
    useEffect(() => {
        Client.fetch('/user/getnameofusers')
            .then((data) => {
                setNameOfUsers(data);
            })
            .catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    }, []);

    const handleSearchInputChange = (targetValue: string): void => setSearchBarValue(targetValue);

    const setSearchBarDefaultState = (): void => {
        setSearching((prevState) => !prevState);
        setSearchBarValue('');
    };

    const handleSearchBarIconClick: React.MouseEventHandler<FormLabel> = () => {
        setSearchBarDefaultState();
    };

    const displayMoreResults = async (): Promise<void> => {
        await history.push({
            pathname: '/app/members',
            state: {
                usersToDisplay: searchResults && searchResults.map((user) => user._id),
                searchString: searchBarValue
            }
        });

        setSearchBarDefaultState();
    };

    const handleKeyDown: React.KeyboardEventHandler = (e) => {
        switch (e.key) {
            case 'Enter':
                displayMoreResults();
                break;
            case 'Escape':
                setSearchBarDefaultState();
                break;
            default:
                break;
        }
    };

    const closeMemberModal: React.MouseEventHandler<HTMLButtonElement> = () => {
        setMemberDialogData(null);
        setShowMemberDialog(false);
    };

    const handleSearchResultClick = (id: string): void => {
        Client.fetch('/user/registereduserdata', {
            method: 'POST',
            body: { userIDs: [id] }
        })
            .then((visibleUserData) => {
                setMemberDialogData(visibleUserData[0]);
                setShowMemberDialog(true);
            }).catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    };

    return (
        <>
            {showAlert &&
                <Alert
                    alertClose={closeAlert}
                    alertMsg={alert[alertMessage]}
                    alertType={alertType}
                />}
            {showMemberDialog && memberDialogData &&
                <MemberDetails
                    closeDialog={closeMemberModal}
                    selectedMemberData={memberDialogData}
                />}
            <Container fluid className="header d-flex p-0" as="header">
                <Row className="d-flex">
                    <Figure
                        className={`avatar-container d-none m-0${searching ? '' : ' d-md-flex'}`}
                        onClick={handleAvatarClick}
                    >
                        <Figure.Image
                            src={avatarSrc}
                            alt="Avatar"
                            roundedCircle
                            width={70}
                            height={70}
                            className="d-none d-sm-flex"
                        />
                        <Figure.Caption className={`avatar-name d-none ${searching ? '' : 'd-sm-flex'}`} as="h2">
                            {ActiveUserNameWrapper()}
                        </Figure.Caption>
                    </Figure>
                    <h1 className={`page-name m-0 ${searching ? 'd-none' : ''}`}>{activePage}</h1>

                    <SearchBar
                        controlId="headerSearchBar"
                        className={searching ? 'active' : ''}
                        handleInputChange={handleSearchInputChange}
                        inputValue={searchBarValue}
                        handleIconClick={handleSearchBarIconClick}
                        icon={searching ? <CrossIcon className="cross" /> : <SearchIcon />}
                        disabled={!searching}
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        className={`burger-lines d-md-none position-absolute${searching ? ' d-none' : ''}`}
                        onClick={handleHamburgerClick}
                    >
                        <HamburgerIcon className={`hamburger-icon${isHamburgerOpen ? ' open' : ''}`} />
                    </button>
                    <div className={isHamburgerOpen ? 'slider position-absolute slideIn' : 'slider position-absolute'}>
                        <Navbar navStyle="hamburger" openSubmenu={window.location.href.includes('admin')} />
                    </div>
                </Row>
                {searchResults && (
                    <Row className="d-flex search-results">
                        <ul>
                            {searchResults.length
                                ? (
                                    <>{/* Render only the first three results */}
                                        {searchResults.slice(0, 3).map((user, key) => {
                                            return (
                                                <li key={key} onClick={(): void => { handleSearchResultClick(user._id); }}>
                                                    <p>
                                                        {user.spiritualName !== '-' && <span>{user.spiritualName}</span>}
                                                        <span>{AnyUserNameWrapper(user.firstName, user.lastName)}</span>
                                                    </p>
                                                </li>
                                            );
                                        })}
                                        {/* Render the number of additional results if there are more than 3 */}
                                        {searchResults.length > 3 && (
                                            <li key="4" onClick={displayMoreResults}>
                                                <p><span>{searchResults.length - 3} more results...</span></p>
                                            </li>
                                        )}
                                    </>
                                )
                                : (/* Render a message when no result was found */
                                    <li className="not-found">
                                        <p><span>&quot;{searchBarValue}&quot; not found</span></p>
                                    </li>
                                )}
                        </ul>
                    </Row>
                )}
            </Container>

        </>
    );
};

export default withRouter(Header);
