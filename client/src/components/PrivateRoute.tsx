import React, { useEffect } from 'react';
import { Route, RouteProps, Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

interface PrivateRouteProps extends RouteProps {
    component: any;
    history?: any;
};

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
    const { component: Component, ...rest } = props;
    const userStatus = sessionStorage.getItem('userStatus');

    const history = useHistory();

    useEffect(() => {
        return history.listen(() => {
            window.scrollTo(0, 0);
        });
    }, [history]);

    return (
        // Show the component only when user is known
        // Otherwise, redirect the user to / page
        <Route {...rest} render={ (props) => (
            userStatus
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
