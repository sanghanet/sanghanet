import React from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';

const MemberDetails = (props) => {
    const { closeDialog, selectedMemberData } = props;
    return (
        <GenericDialog
            title="See member's details"
            reject="Close"
            handleClose={closeDialog}
        >
            <p>{JSON.stringify(selectedMemberData)}</p>
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.object.isRequired
};

export default MemberDetails;
