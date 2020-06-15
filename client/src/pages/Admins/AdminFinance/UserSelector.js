import React from 'react';
import Client from '../../../components/Client';

class UserSelector extends React.Component {
    componentDidMount () {
        this.getUserList();
    }

    getUserList = async () => {
        const result = await Client.fetch('/finance/userlist');
        console.log(result);
    }

    render () {
        return (
            <input></input>
        );
    }
}

export default UserSelector;
