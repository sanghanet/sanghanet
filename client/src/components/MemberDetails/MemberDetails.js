import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';
import AnyUserNameWrapper from '../NameWrappers/AnyUserName/AnyUserNameWrapper'
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as CopyIcon } from './copy.svg';
import './MemberDetails.scss';

const MemberDetails = (props) => {
    const [dataCopy, setDataCopy] = useState(false);
    const { modalMembersDictionary, generalTermsDictionary, personalPagePlaceholders } = useContext(UIcontext).dictionary;
    const { COPY, COPYTOCLIPBOARD } = modalMembersDictionary;
    const { memberDetails } = useContext(UIcontext).dictionary;
    const { SPIRITUALNAME, DATEOFBIRTH, GENDER, LEVELOFSTUDY, EMAIL, MOBILE, ADDRESS, EMNAME, EMMOBILE, EMEMAIL } = memberDetails;
    const { modalButtons } = useContext(UIcontext).dictionary;
    const { REJECT } = modalButtons;
    const { closeDialog, selectedMemberData: data } = props;

    const copyToClipboard = (event) => {
        navigator.clipboard.writeText(event.currentTarget.dataset.attribute)
            .then(() => { setDataCopy(true); })
            .catch(() => console.log('Copy to clipboard failed'));
    };
    const resetClipboardCopy = (event) => {
        setDataCopy(false);
    };
    const userData = (label, value) => {
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
            title={
                <AnyUserNameWrapper
                    firstName={data.firstName}
                    lastName={data.lastName}
                />
            }
            reject={REJECT}
            handleClose={closeDialog}
        >
            <div className="photo-data">
                <img src={data.profileImg} className="data-photo" alt="" />
            </div>
            {data.spiritualName && data.spiritualName !== 'None' && userData(SPIRITUALNAME, data.spiritualName)}
            {data.birthday && userData(DATEOFBIRTH, data.birthday)}
            {data.gender && userData(GENDER, personalPagePlaceholders[data.gender.toUpperCase()])}
            {data.level && userData(LEVELOFSTUDY, generalTermsDictionary[data.level.toUpperCase()])}
            {data.email && userData(EMAIL, data.email)}
            {data.mobile && userData(MOBILE, data.mobile)}
            {data.address && userData(ADDRESS, data.address)}
            {data.emName && userData(EMNAME, data.emName)}
            {data.emMobile && userData(EMMOBILE, data.emMobile)}
            {data.emEmail && userData(EMEMAIL, data.emEmail)}
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.object.isRequired
};

export default MemberDetails;
