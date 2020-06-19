import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from '../icons/avatar.jpg';
// import SearchBar from '../Search/SearchBar';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../Search/SearchBar';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as Cross } from '../icons/cross.svg';
import { Container, Row, Figure, Button } from 'react-bootstrap';

const Header = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);

    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/personal') {
            props.history.push('/personal');
        }
    };
    const handleHamburgerClick = (event) => {
        if (event.target.className.includes('header-shim')) return;

        const slider = document.getElementsByClassName('slider')[0];
        const headerShim = document.getElementsByClassName('header-shim')[0];

        slider.classList.toggle('slideIn');
        headerShim.classList.toggle('slideIn');
    };

    const handleSearchFieldUpdate = (event) => { setSearchValue(event); };

    const handleSearchIconClick = () => {
        setSearching(!searching);
        if (!searching) setSearchValue('');
    };

    return (
        <Container fluid className='header d-flex p-0' as='header'>
            <Row className='d-flex'>
                <Figure
                    className={`avatar-container m-0 d-none ${!searching ? 'd-md-flex' : ''}`}
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
                    <Figure.Caption className='avatar-name d-none d-sm-flex' as='h2'>
                        {sessionStorage.user}
                    </Figure.Caption>
                </Figure>
                <h1 className={`page-name m-0 ${searching ? 'd-none' : ''}`}>{props.activePage}</h1>

                <SearchBar
                    handleInputChange={handleSearchFieldUpdate}
                    inputValue={searchValue}
                    icon={!searching ? <SearchIcon /> : <Cross className="cross" />}
                    handleIconClick={handleSearchIconClick}
                    customClassName={searching ? 'active' : ''}
                />

                <button
                    className='burger-lines d-md-none position-absolute'
                    onClick={handleHamburgerClick}
                >
                    <input className='custom' type='checkbox' />
                    <div className='header-shim'></div>
                    <div className='hamburger-line'></div>
                    <div className='hamburger-line'></div>
                    <div className='hamburger-line'></div>
                </button>
                <div className='slider position-absolute'>
                    <Navbar navStyle="hamburger" openSubmenu={window.location.href.includes('admin')} />
                </div>
            </Row>
        </Container>
    );
};

Header.propTypes = {
    activePage: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(Header);
