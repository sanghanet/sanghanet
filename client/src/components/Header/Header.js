import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from '../icons/avatar.jpg';
// import SearchBar from '../Search/SearchBar';
import Navbar from '../Navbar/Navbar';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as HamburgerIcon } from '../icons/hamburger-icon.svg';
import { Container, Row, Figure, Button } from 'react-bootstrap';
import { HamburgerContext } from '../contexts/Hamburger/HamburgerContext';

const Header = (props) => {
    const { isHamburgerOpen, toggleHamburger } = useContext(HamburgerContext);

    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/app/personal') {
            props.history.push('/app/personal');
        }
    };

    const handleHamburgerClick = (event) => {
        event.stopPropagation(); // w/o this, bubbling event immediately close the menu in App.js!
        toggleHamburger();
    };

    return (
        <Container fluid className='header d-flex p-0' as='header'>
            <Row className='d-flex'>
                <Figure
                    className='avatar-container d-none d-md-flex m-0'
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
                {/* <SearchBar className='d-md-flex d-none'/> */}
                <h1 className='page-name m-0'>{props.activePage}</h1>

                <Button className='search-icon' variant='outline-light'>
                    <SearchIcon />
                </Button>

                <div className={isHamburgerOpen ? 'header-shim slideIn' : 'header-shim'}></div>
                <button
                    className='burger-lines d-md-none position-absolute'
                    onClick={ handleHamburgerClick }
                >
                    <HamburgerIcon className={`hamburger-icon${isHamburgerOpen ? ' open' : ''}`} />
                </button>
                <div className={isHamburgerOpen ? 'slider position-absolute slideIn' : 'slider position-absolute'}>
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
