import React from 'react';
import PropTypes from 'prop-types';
import './MemberCard.scss';

const MemberCard = (props) => {
    const { index, profileImg, firstName, lastName, spiritualName, showMemberPopup, activeMember } = props;
    const showMemberDetails = () => { showMemberPopup(index); };
    return (
        <li className={`member-card ${activeMember ? 'active-member' : ''}`}>
            <div className="profile-img">
                <img src={profileImg} alt="Avatar" />
            </div>
            <div className="member-content">
                <p className="card-name">{`${firstName} ${lastName}`}</p>
                <hr className="card-line"></hr>
                <p className="card-spiritual-name">{spiritualName}</p>
                <button onClick={showMemberDetails}>See shared data</button>
            </div>
        </li>
    );
};

MemberCard.propTypes = {
    index: PropTypes.number.isRequired,
    profileImg: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    spiritualName: PropTypes.string.isRequired,
    showMemberPopup: PropTypes.func.isRequired,
    activeMember: PropTypes.bool.isRequired
};

export default MemberCard;
