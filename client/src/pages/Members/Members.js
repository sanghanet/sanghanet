import React, { useState, useEffect } from 'react';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import MemberCard from '../../components/MemberCard/MemberCard';
import MemberDetails from '../../components/MemberDetails/MemberDetails';

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
        Client.fetch('/user/allregisteredusers', { method: 'POST' })
            .then((visibleUserData) => {
                setMembers(visibleUserData);
            }).catch((err) => {
                console.log(err);
                setAlert({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    }, []); //  to run an effect and clean it up only once
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
                <ul className="card-container">
                    {
                        members.map((member, index) =>
                            (<MemberCard
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

export default Members;
