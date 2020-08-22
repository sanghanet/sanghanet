import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './Members.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import MemberCard from '../../components/MemberCard/MemberCard';
import MemberDetails from '../../components/MemberDetails/MemberDetails';

import { Button } from 'react-bootstrap';

const Members = (props) => {
    const [members, setMembers] = useState([]);
    const [memberIndex, setMemberIndex] = useState(-1); // -1 means no selected member
    const [alert, setAlert] = useState({ showAlert: false, alertMessage: '', alertType: '' });

    const showMemberPopup = (index) => {
        setMemberIndex(index);
    };
    const closeMemberPopup = () => {
        setMemberIndex(-1);
    };
    const closeAlert = () => {
        setAlert({ showAlert: false, alertMessage: '', alertType: '' });
    };

    useEffect(() => {
        Client.fetch('/user/registereduserdata', { method: 'POST' })
            .then((visibleUserData) => {
                setMembers(visibleUserData);
            }).catch((err) => {
                console.log(err);
                setAlert({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    }, [props]); //  to run an effect and clean it up only once

    const displayMember = (id) => {
        const usersToDisplay = props.location.state?.usersToDisplay;
        return usersToDisplay ? usersToDisplay.includes(id) : true;
    };

    const resetMembersFilter = () => {
        props.history.push({
            pathname: '/app/members',
            state: {
                usersToDisplay: null,
                searchString: ''
            }
        });
    };

    return (
        members && (
            <React.Fragment>
                { alert.showAlert &&
                    <Alert
                        alertClose={closeAlert}
                        alertMsg={alert.alertMessage}
                        alertType={alert.alertType}
                    />
                }
                {memberIndex >= 0 &&
                    <MemberDetails
                        closeDialog={closeMemberPopup}
                        selectedMemberData={members[memberIndex]}
                    />
                }
                <div className='member-page-heading'>{
                    props.location.state?.searchString
                        ? (
                            <>
                                <p>{`Showing results for "${props.location.state.searchString}"`}</p>
                                <Button variant="dark" onClick={resetMembersFilter}>Show all members</Button>
                            </>
                        ) : <p>{'Showing all members'}</p>
                }</div>
                <ul className="card-container">
                    {
                        members.map((member, index) =>
                            (displayMember(member._id) &&
                            <MemberCard
                                key={index}
                                index={index}
                                profileImg={member.profileImg}
                                firstName={member.firstName}
                                lastName={member.lastName}
                                spiritualName={member.spiritualName}
                                showMemberPopup={showMemberPopup}
                                activeMember={member.activeMember}
                            />)
                        )
                    }
                </ul>
            </React.Fragment>
        )
    );
};

export default withRouter(Members);
