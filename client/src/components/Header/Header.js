import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from '../icons/avatar.jpg';
// import SearchBar from '../Search/SearchBar';
import Navbar from '../Navbar/Navbar';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { Container, Row, Figure, Button } from 'react-bootstrap';

const Header = (props) => {
    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/personal') {
            props.history.push('/personal');
        }
    };

    const handleHamburgerClick = () => {
        const slider = document.getElementsByClassName('slider')[0];
        const hamburger = document.getElementsByClassName('burger-lines')[0];

        slider.classList.toggle('slideIn');
        hamburger.classList.toggle('activeBurger');
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
                    <SearchIcon/>
                </Button>

                <button
                    className='burger-lines d-md-none position-absolute'
                    onClick={handleHamburgerClick}
                >
                    <input type='checkbox' />
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div className='slider position-absolute'>
                    <Navbar navStyle="hamburger" />
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
