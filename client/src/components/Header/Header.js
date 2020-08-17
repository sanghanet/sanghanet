import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../Search/SearchBar';

import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as HamburgerIcon } from '../icons/hamburger-icon.svg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Figure from 'react-bootstrap/Figure';

import { UIcontext } from '../contexts/UIcontext/UIcontext';
import Client from '../../components/Client';

const Header = (props) => {
    const { isHamburgerOpen, toggleHamburger } = useContext(UIcontext);
    const [searchBarValue, setSearchBarValue] = useState('');
    const [nameOfUsers, setNameOfUsers] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [userAvatarUrl, setUserAvatarURL] = useState('/images/noAvatar.svg');

    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/app/personal') {
            props.history.push('/app/personal');
        }
    };

    const handleHamburgerClick = (event) => {
        event.stopPropagation(); // w/o this, bubbling event immediately close the menu in App.js!
        toggleHamburger();
    };

    const getSearchResults = useCallback(() => {
        if (searchBarValue.length < 3) return null;
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
        setSearchResults(searchBarValue.length < 3 ? null : getSearchResults());
    }, [searchBarValue, getSearchResults]);

    // componentDidMount
    useEffect(() => {
        Client.fetch('/user/getnameofusers')
            .then((data) => {
                setNameOfUsers(data);
            })
            .catch((err) => {
                console.log(err);
            });
        Client.fetch('/user/avatarurl')
            .then((data) => {
                setUserAvatarURL(data[0].profileImg);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSearchInputChange = (targetValue) => setSearchBarValue(targetValue);

    const handleSearchBarIconClick = () => {
        setSearching((prevState) => !prevState);
        setSearchBarValue('');
    };

    return (
        <Container fluid className='header d-flex p-0' as='header'>
            <Row className='d-flex'>
                <Figure
                    className={`avatar-container d-none ${searching ? '' : 'd-md-flex'} m-0`}
                    onClick={handleAvatarClick}
                >
                    <Figure.Image
                        src={userAvatarUrl}
                        alt='Avatar'
                        roundedCircle
                        width={70}
                        height={70}
                        className="d-none d-sm-flex"
                    />
                    <Figure.Caption className={`avatar-name ${searching ? 'd-none' : ''}`} as='h2'>
                        {sessionStorage.user}
                    </Figure.Caption>
                </Figure>
                <h1 className={`page-name m-0 ${searching ? 'd-none' : ''}`}>{props.activePage}</h1>

                <SearchBar
                    controlId='headerSearchBar'
                    className={searching ? 'active' : ''}
                    handleInputChange={handleSearchInputChange}
                    inputValue={searchBarValue}
                    handleIconClick={handleSearchBarIconClick}
                    icon={searching ? <CrossIcon className='cross' /> : <SearchIcon />}
                />

                <div className={isHamburgerOpen ? 'header-shim slideIn' : 'header-shim'}></div>
                <button
                    className={`burger-lines d-md-none position-absolute${searching ? ' d-none' : ''}`}
                    onClick={ handleHamburgerClick }
                >
                    <HamburgerIcon className={`hamburger-icon${isHamburgerOpen ? ' open' : ''}`} />
                </button>
                <div className={isHamburgerOpen ? 'slider position-absolute slideIn' : 'slider position-absolute'}>
                    <Navbar navStyle="hamburger" openSubmenu={window.location.href.includes('admin')} />
                </div>
            </Row>
            {searchResults && (
                <Row className='d-flex search-results'>
                    <ul>
                        {(searchResults.length) ? (
                            <React.Fragment>
                                {/* Render only the first three results */}
                                {searchResults.slice(0, 3).map((user, key) => {
                                    return (
                                        <li key={key} >
                                            {user.spiritualName === 'None' ? (
                                                <div>
                                                    <p>{user.firstName} {user.lastName}</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>{user.spiritualName}</p>
                                                    <p>{user.firstName} {user.lastName}</p>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                                {/* Render the number of additional results if there are more than 3 */}
                                {searchResults.length > 3 && (
                                    <li key="4">
                                        <div>{searchResults.length - 3} more results...</div>
                                    </li>
                                )}
                            </React.Fragment>
                        ) : (
                            /* Render a message when no result was found */
                            <li className="not-found">
                                <div>&quot;{searchBarValue}&quot; not found</div>
                            </li>
                        )}
                    </ul>
                </Row>
            )}
        </Container>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Header);
