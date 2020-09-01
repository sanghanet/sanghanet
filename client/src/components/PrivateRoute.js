import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    const user = sessionStorage.getItem('user');

    const history = useHistory();

    useEffect(() => {
        return history.listen(() => {
            window.scrollTo(0, 0);
        });
    }, [history]);

    return (
        // Show the component only when user is known
        // Otherwise, redirect the user to / page
        // TODO: test unknown user
        // FIXME: clarify rest and props - which one goes where
        <Route {...rest} render={ (props) => (
            user
                ? <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default PrivateRoute;
