import React from 'react';

import FinanceContainer from '../../Finances/FinanceContainer/FinanceContainer';
import UserSelector from './UserSelector/UserSelector';

class AdminFinance extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedUserEmail: null
        };
    }

    onSelection = (email) => {
        this.setState({ selectedUserEmail: email });
    }

    render () {
        return (
            <React.Fragment>
                <UserSelector handleSubmit={this.onSelection} />
                <FinanceContainer selectedUser = {this.state.selectedUserEmail} />
            </React.Fragment>
        );
    }
}

export default AdminFinance;
