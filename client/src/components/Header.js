import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Header.scss';
import Avatar from './icons/avatar.jpg';
import SearchBar from './SearchBar';
import { ReactComponent as SearchIcon } from './icons/search.svg';
import { Container, Row, Figure, Button } from 'react-bootstrap';

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
                    bsPrefix='avatar-container d-flex m-0'
                    onClick={handleAvatarClick}
                >
                    <Figure.Image
                        src={Avatar}
                        alt='Profile'
                        roundedCircle
                        width={70}
                        height={70}
                    />
                    <Figure.Caption bsPrefix='avatar-name' as='h2'>
                        {sessionStorage.user}
                    </Figure.Caption>
                </Figure>
                <SearchBar className="d-md-flex d-none"/>
                <h1 className='page-name m-0'>{props.activePage}</h1>

                <div className='mobile-header-items d-flex d-md-none d-flex'>
                    <Button className="search-icon" variant="outline-light">
                        <SearchIcon/>
                    </Button>
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
