import React from 'react';

import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
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
            <div className='grid-container'>
                <Header activePage="Finance Admin" />
                <Navbar navStyle="sidenav" openSubmenu={true} />
                <main className="align">
                    <UserSelector handleSubmit={this.onSelection} />
                    <FinanceContainer selectedUser = {this.state.selectedUserEmail} />
                </main>
            </div>
        );
    }
}

export default AdminFinance;
