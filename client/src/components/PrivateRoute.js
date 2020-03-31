import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
    const { component: Component, navbarScrollPos, ...rest } = props;
    const user = sessionStorage.getItem('user');
    const isActive = sessionStorage.getItem('isActive');
    console.log(navbarScrollPos);
    return (
        // Show the component only when user is known & active
        // Otherwise, redirect the user to / page
        <Route {...rest} render={ (props) => (
            user && isActive
                ? <Component navbarScrollPos={navbarScrollPos} {...props} />
                : <Redirect to="/" />
        )} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    navbarScrollPos: PropTypes.number
};

export default PrivateRoute;
