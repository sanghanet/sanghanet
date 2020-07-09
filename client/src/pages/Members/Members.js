import React, { useState, useEffect } from 'react';
import Client from '../../components/Client';
import MemberCard from '../../components/MemberCard/MemberCard';
import './Members.scss';

const Members = (props) => {
    const [members, setMembers] = useState([]);

    const showMemberPopup = (index) => {
        console.log(members[index]);
    };

    useEffect(() => {
        Client.fetch('/user/allregisteredusers', { method: 'POST' })
            .then((visibleUserData) => {
                setMembers(visibleUserData);
            }).catch((err) => {
                console.log(err);
                // this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    }, []); //  to run an effect and clean it up only once
    // https://medium.com/thecodefountain/fetch-api-data-using-useeffect-react-hook-465809ca12c6
    return (
        members && (
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
                        />)
                    )
                }
            </ul>
        )
    );
};

export default Members;
