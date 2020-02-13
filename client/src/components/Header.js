import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from './icons/avatar.jpg';
import SearchBar from './SearchBar';
import PageNavigation from './PageNavigation';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { Container, Row, Figure, Button } from 'react-bootstrap';

const Header = (props) => {
    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/profile') {
            props.history.push('/profile');
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
                    bsPrefix='avatar-container d-md-flex d-grid m-0'
                    onClick={handleAvatarClick}
                >
                    <Figure.Image
                        src={Avatar}
                        alt='Profile'
                        roundedCircle
                        width={70}
                        height={70}
                    />
                    <Figure.Caption bsPrefix='avatar-name d-none d-sm-flex' as='h2'>
                        {sessionStorage.user}
                    </Figure.Caption>
                </Figure>
                <SearchBar className='d-md-flex d-none'/>
                <h1 className='page-name m-0 d-none d-md-flex'>{props.activePage}</h1>

                <Button className='search-icon d-flex d-md-none' variant='outline-light'>
                    <SearchIcon/>
                </Button>

                <button
                    className='burger-lines p-0 d-flex d-md-none position-absolute'
                    onClick={handleHamburgerClick}
                >
                    <input type='checkbox' />
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div className='slider position-absolute'>
                    <PageNavigation />
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
