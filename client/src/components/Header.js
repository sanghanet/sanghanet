import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from './icons/avatar.jpg';
import SearchBar from './SearchBar';
import PageNavigation from './PageNavigation';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { Container, Row, Figure, Navbar, Nav, Button } from 'react-bootstrap';

const Header = (props) => {
    const handleAvatarClick = (event) => {
        if (props.location.pathname !== '/profile') {
            props.history.push('/profile');
        }
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
                    <Figure.Caption bsPrefix='avatar-name d-none' as='h2'>
                        {sessionStorage.user}
                    </Figure.Caption>
                </Figure>
                <SearchBar className='d-md-flex d-none'/>
                <h1 className='page-name m-0 d-none d-md-flex'>{props.activePage}</h1>

                <Button className='search-icon d-flex d-md-none' variant='outline-light'>
                    <SearchIcon/>
                </Button>
                <Navbar expand='md' className='navbar-dark d-flex d-md-none p-0'>
                    <Navbar.Toggle aria-controls='mobile-nav' />
                    <Navbar.Collapse id='mobile-nav' className='mobile-nav position-absolute'>
                        <Nav>
                            <PageNavigation />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
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
