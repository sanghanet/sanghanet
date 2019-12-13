import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = { list: null };
    }

    fetchData = () => {
        fetch('http://localhost:4000/userList', { method: 'GET' })
            .then((res) => {
                return res.json();
            }).then((data) => {
                this.printUserList(data);
            }).catch((err) => {
                throw new Error(err.message);
            });
    }

    printUserList = (userArray) => {
        const result = userArray.map((value, index) => {
            return (
                <div key={value._id}>
                    {index} {value.first_name} {value.last_name}
                </div>
            );
        });

        this.setState({ list: result });
    }

    onLogout = () => {
        console.log('You are logged out');
        this.props.signOut();
    }

    render () {
        return (
            <div>
                <button onClick = {this.fetchData}>List users</button>
                <div>{this.state.list}</div>
                <GoogleLogout
                    clientId="55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com"
                    buttonText="Sign out"
                    onLogoutSuccess={this.onLogout}
                    theme='dark'
                    className='logout-btn'
                >
                </GoogleLogout>
            </div>
        );
    }
}

Home.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Home;
