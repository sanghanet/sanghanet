import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from '../icons/avatar.jpg';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../Search/SearchBar';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as CrossIcon } from '../icons/cross.svg';
import { ReactComponent as Hamburger } from '../icons/bars-solid.svg';
import { ReactComponent as HamburgerClose } from '../icons/times-solid.svg';
import { Container, Row, Figure } from 'react-bootstrap';
import { HamburgerContext } from '../contexts/Hamburger/HamburgerContext';
import Client from '../../components/Client';

const Header = (props) => {
    const { isHamburgerOpen, toggleHamburger } = useContext(HamburgerContext);
    const [searchBarValue, setSearchBarValue] = useState('');
    const [nameOfUsers, setNameOfUsers] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);

    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/personal') {
            props.history.push('/personal');
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
                        src={Avatar}
                        alt='Avatar'
                        roundedCircle
                        width={70}
                        height={70}
                        className="d-none d-sm-flex"
                    />
                    <Figure.Caption className={`avatar-name d-none ${searching ? '' : 'd-sm-flex'}`} as='h2'>
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
                    <Hamburger className={isHamburgerOpen ? 'icons hambi hide-hambi' : 'icons hambi'} />
                    <HamburgerClose className={isHamburgerOpen ? 'icons x show-x' : 'icons x'} />
                </button>
                <div className={isHamburgerOpen ? 'slider position-absolute slideIn' : 'slider position-absolute'}>
                    <Navbar navStyle="hamburger" openSubmenu={window.location.href.includes('admin')} />
                </div>
            </Row>
            {searchResults && (
                <Row className='d-flex'>
                    <ul>
                        {(searchResults.length) ? (
                            searchResults.map((user, key) => {
                                return (
                                    <li key={key} >
                                        {user.spiritualName === 'None' ? `${user.firstName} ${user.lastName}` : user.spiritualName}
                                    </li>
                                );
                            })
                        ) : (<li>User not found</li>)}
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
