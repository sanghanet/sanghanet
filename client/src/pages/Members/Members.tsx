import React, { useState, useEffect, useContext } from 'react';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import { withRouter } from 'react-router-dom';
import './Members.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import MemberCard from '../../components/MemberCard/MemberCard';
import MemberDetails from '../../components/MemberDetails/MemberDetails';

import { Button } from 'react-bootstrap';

//FIXME: REMOVE ALL @ts-ignore comments !!!

const Members: React.FC = (props) => {
    const { SHOWINGRESULTSFOR, SHOWALLMEMBERSBUTTON, SHOWINGMEMBERSTITLE } = useContext(UIcontext).dictionary.membersPage;

    const [members, setMembers] = useState<RegisteredUserType[]>([]);
    const [memberIndex, setMemberIndex] = useState(-1); // -1 means no selected member
    const [alert, setAlert] = useState({ showAlert: false, alertMessage: '', alertType: 'NOALERT' });

    const showMemberPopup = (index: number) => {
        setMemberIndex(index);
    };
    const closeMemberPopup = () => {
        setMemberIndex(-1);
    };
    const closeAlert = () => {
        setAlert({ showAlert: false, alertMessage: '', alertType: 'NOALERT' });
    };

    useEffect(() => {
        Client.fetch('/user/registereduserdata', { method: 'POST' })
            .then((visibleUserData: RegisteredUserType[]) => {
                setMembers(visibleUserData);
            }).catch((err) => {
                console.log(err);
                setAlert({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
    }, [props]); //  to run an effect and clean it up only once

    const displayMember = (id: string) => {
        // @ts-ignore
        const usersToDisplay = props.location.state?.usersToDisplay;
        return usersToDisplay ? usersToDisplay.includes(id) : true;
    };

    const resetMembersFilter = () => {
        // @ts-ignore
        props.history.push({
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
                        alertType={alert.alertType as ALERT}
                    />
                }
                {memberIndex >= 0 &&
                    <MemberDetails
                        closeDialog={closeMemberPopup}
                        selectedMemberData={ members[memberIndex]}
                    />
                }
                <div className='member-page-heading'>{
                    // @ts-ignore
                    props.location.state?.searchString
                        ? (
                            <>
                                {/* @ts-ignore */ }
                                <p>{`${SHOWINGRESULTSFOR} "${props.location.state.searchString}"`}</p>
                                <Button variant="dark" onClick={resetMembersFilter}>{SHOWALLMEMBERSBUTTON}</Button>
                            </>
                        ) : <h2>{SHOWINGMEMBERSTITLE}</h2>
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
