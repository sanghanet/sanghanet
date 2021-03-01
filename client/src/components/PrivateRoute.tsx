import React, { useEffect } from 'react';
import { Route, RouteProps, Redirect, useHistory, RouteComponentProps } from 'react-router-dom';
import H from 'history';
import PropTypes from 'prop-types';


interface PrivateRouteProps extends RouteProps {
    component:  React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    history?: H.History
};

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
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

//TODO: history validation would be nice

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
};

export default PrivateRoute;
