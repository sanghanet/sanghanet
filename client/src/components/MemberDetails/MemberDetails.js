import React from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';
import './MemberDetails.scss';

const MemberDetails = (props) => {
    const { closeDialog, selectedMemberData } = props;
    return (
        <GenericDialog
            title={`${selectedMemberData.firstName} ${selectedMemberData.lastName}`}
            reject="Close"
            handleClose={closeDialog}
        >
            <div className="photo-data">
                <img src={selectedMemberData.profileImg} className="data-photo" alt="" />
            </div>
            <div className="member-data">
                <div className="data-label">Spiritual Name</div>
                <div className="data-value">{selectedMemberData.spiritualName}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Date of Birth</div>
                <div className="data-value">{selectedMemberData.birthday}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Gender</div>
                <div className="data-value">{selectedMemberData.gender}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Level of study</div>
                <div className="data-value">{selectedMemberData.level}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Email</div>
                <div className="data-value">{selectedMemberData.email}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Mobile</div>
                <div className="data-value">{selectedMemberData.mobile}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Address</div>
                <div className="data-value">{selectedMemberData.address}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Emergency Contact Name</div>
                <div className="data-value">{selectedMemberData.emName}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Emergency Contact Mobile</div>
                <div className="data-value">{selectedMemberData.emMobile}</div>
            </div>
            <div className="member-data">
                <div className="data-label">Emergency Contact Email</div>
                <div className="data-value">{selectedMemberData.emEmail}</div>
            </div>
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.object.isRequired
};

export default MemberDetails;
