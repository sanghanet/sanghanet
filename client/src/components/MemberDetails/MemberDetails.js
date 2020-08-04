import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as CopyIcon } from './copy.svg';
import './MemberDetails.scss';

const MemberDetails = (props) => {
    const [dataCopy, setDataCopy] = useState(false);
    const { modalMembersDictionary } = useContext(UIcontext).dictionary;
    const { COPY, COPYTOCLIPBOARD } = modalMembersDictionary;

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
            title={`${data.firstName} ${data.lastName}`}
            reject="Close"
            handleClose={closeDialog}
        >
            <div className="photo-data">
                <img src={data.profileImg} className="data-photo" alt="" />
            </div>
            {data.spiritualName && data.spiritualName !== 'None' && userData('Spiritual Name:', data.spiritualName)}
            {data.birthday && userData('Date of Birth:', data.birthday)}
            {data.gender && userData('Gender:', data.gender)}
            {data.level && userData('Level of Study::', data.level)}
            {data.email && userData('Email:', data.email)}
            {data.mobile && userData('Mobile:', data.mobile)}
            {data.address && userData('Address:', data.address)}
            {data.emName && userData('Emergency Contact Name:', data.emName)}
            {data.emMobile && userData('Emergency Contact Mobile:', data.emMobile)}
            {data.emEmail && userData('Emergency Contact Email:', data.emEmail)}
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.object.isRequired
};

export default MemberDetails;
