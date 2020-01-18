import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
    console.log(props);
    const { path, Component, ...rest } = props;

    const user = sessionStorage.getItem('user');
    return (
        // Show the component only when the user is known
        // Otherwise, redirect the user to / page
        <Route path={path} render={ rest => (
            user ? <Component {...rest} />
                : <Redirect to="/" />
        )} />
    );
    // return <Redirect to="/" />
};

PrivateRoute.propTypes = {
    Component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default PrivateRoute;
