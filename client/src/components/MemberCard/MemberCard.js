import React from 'react';
import PropTypes from 'prop-types';
import './MemberCard.scss';

const MemberCard = (props) => {
    const { index, profileImg, firstName, lastName, spiritualName, showMemberPopup } = props;
    const showMemberDetails = () => { showMemberPopup(index); };
    return (
        <li className="member-card">
            <div className="profile-img">
                <img src={profileImg} alt="Avatar" />
            </div>
            <p className="card-name">{`${firstName}${lastName}`}</p>
            <hr className="card-line"></hr>
            <p className="card-spiritual-name">{spiritualName}</p>
            <button onClick={showMemberDetails}>See shared data</button>
        </li>

    );
};

MemberCard.propTypes = {
    index: PropTypes.number.isRequired,
    profileImg: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    spiritualName: PropTypes.string.isRequired,
    showMemberPopup: PropTypes.func.isRequired
};

export default MemberCard;
