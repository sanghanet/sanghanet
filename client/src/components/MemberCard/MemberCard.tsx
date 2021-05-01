import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AnyUserNameWrapper from '../NameWrappers/AnyUserName/AnyUserNameWrapper';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './MemberCard.scss';

interface MemberCardProps {
    index: number;
    profileImg: string;
    firstName: string;
    lastName: string;
    spiritualName: string;
    showMemberPopup: (n: number) => void;
    activeMember: boolean;
};

const MemberCard: React.FC<MemberCardProps> = ({ index, profileImg, firstName, lastName, spiritualName, showMemberPopup, activeMember }) => {
    const showMemberDetails = (): void => { showMemberPopup(index); };
    const { SEESHAREDDATA } = useContext(UIcontext).dictionary.memberCardButton;

    return (
        <li className={`member-card ${activeMember ? 'active-member' : ''}`}>
            <div className="profile-img">
                <img src={profileImg} alt="Avatar" />
            </div>
            <div className="member-content">
                <p className="card-name">{AnyUserNameWrapper(firstName, lastName)}</p>
                <hr className="card-line" />
                <p className="card-spiritual-name">{spiritualName}</p>
            </div>
            <button onClick={showMemberDetails}>{SEESHAREDDATA}</button>
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
