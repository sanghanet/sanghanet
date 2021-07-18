import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';
import AnyUserNameWrapper from '../NameWrappers/AnyUserName/AnyUserNameWrapper';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as CopyIcon } from '../icons/copy.svg';
import './MemberDetails.scss';

 interface MemberDetailsProps {
    closeDialog: React.MouseEventHandler<HTMLButtonElement>;
    selectedMemberData: RegisteredUserType;
};

const MemberDetails: React.FC<MemberDetailsProps> = ({ closeDialog, selectedMemberData: member }) => {
    const [dataCopy, setDataCopy] = useState(false);
    const { modalMembersDictionary, generalTermsDictionary, personalPagePlaceholders } = useContext(UIcontext).dictionary;
    const { COPY, COPYTOCLIPBOARD } = modalMembersDictionary;
    const { memberDetails } = useContext(UIcontext).dictionary;
    const { SPIRITUALNAME, DATEOFBIRTH, GENDER, LEVELOFSTUDY, EMAIL, MOBILE, ADDRESS, EMNAME, EMMOBILE, EMEMAIL } = memberDetails;
    const { modalButtons } = useContext(UIcontext).dictionary;
    const { REJECT } = modalButtons;

    const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const dataAttrib = event.currentTarget.dataset.attribute;
        navigator.clipboard.writeText(dataAttrib || '')
            .then(() => { setDataCopy(true); })
            .catch(() => console.log('Copy to clipboard failed'));
    };
    const resetClipboardCopy = (): void => {
        setDataCopy(false);
    };
    const userData = (label: string, value: string): React.ReactNode => {
        return (
            <div className="member-data">
                <p className="data-label">{label}</p>
                <div className="value-container">
                    <p className="data-value">{value}</p>
                    <button className="copy-button" data-attribute={value} onClick={copyToClipboard} onMouseOut={resetClipboardCopy}>
                        <CopyIcon />
                        <span className="tooltiptext">{dataCopy ? COPYTOCLIPBOARD : COPY}</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <GenericDialog
            title={AnyUserNameWrapper(member.firstName, member.lastName)}
            reject={REJECT}
            handleClose={closeDialog}
        >
            <div className="photo-data">
                <img src={member.profileImg} className="data-photo" alt="" />
            </div>
            {member.spiritualName && member.spiritualName !== 'None' && userData(SPIRITUALNAME, member.spiritualName)}
            {member.birthday && userData(DATEOFBIRTH, member.birthday)}
            {member.gender && userData(GENDER, personalPagePlaceholders[member.gender.toUpperCase()])}
            {member.level && userData(LEVELOFSTUDY, generalTermsDictionary[member.level.toUpperCase()])}
            {member.email && userData(EMAIL, member.email)}
            {member.mobile && userData(MOBILE, member.mobile)}
            {member.address && userData(ADDRESS, member.address)}
            {member.emName && userData(EMNAME, member.emName)}
            {member.emMobile && userData(EMMOBILE, member.emMobile)}
            {member.emEmail && userData(EMEMAIL, member.emEmail)}
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        activeMember: PropTypes.bool.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        profileImg: PropTypes.string.isRequired,
        spiritualName: PropTypes.string.isRequired,
        birthday: PropTypes.string,
        gender: PropTypes.oneOf(['', 'Male', 'Female', 'Other'] as const),
        level: PropTypes.oneOf(['', 'beginner', 'intermediate', 'advanced'] as const),
        email: PropTypes.string,
        mobile: PropTypes.string,
        address: PropTypes.string,
        emName: PropTypes.string,
        emMobile: PropTypes.string,
        emEmail: PropTypes.string
    }).isRequired
};

export default MemberDetails;
