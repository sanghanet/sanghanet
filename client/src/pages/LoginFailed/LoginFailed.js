import React from 'react';

class LoginFailed extends React.Component {
    componentDidMount () {
        setTimeout(() => { window.location.href = '/'; }, 3000);
    }

    render () {
        return (
            <h1>LOGIN FAILED...</h1>
        );
    }
};

export default LoginFailed;
