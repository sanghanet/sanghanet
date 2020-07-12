import React from 'react';
import PropTypes from 'prop-types';
import GenericDialog from '../Form/GenericDialog/GenericDialog';
import './MemberDetails.scss';

const MemberDetails = (props) => {
    const { closeDialog, selectedMemberData: data } = props;
    return (
        <GenericDialog
            title={`${data.firstName} ${data.lastName}`}
            reject="Close"
            handleClose={closeDialog}
        >
            <div className="photo-data">
                <img src={data.profileImg} className="data-photo" alt="" />
            </div>
            {data.spiritualName && data.spiritualName !== 'None' &&
                <div className="member-data">
                    <div className="data-label">Spiritual Name:</div>
                    <div className="data-value">{data.spiritualName}</div>
                </div>
            }
            {data.birthday &&
                <div className="member-data">
                    <div className="data-label">Date of Birth:</div>
                    <div className="data-value">{data.birthday}</div>
                </div>
            }
            {data.gender &&
                <div className="member-data">
                    <div className="data-label">Gender:</div>
                    <div className="data-value">{data.gender}</div>
                </div>
            }
            {data.level &&
                <div className="member-data">
                    <div className="data-label">Level of Study:</div>
                    <div className="data-value">{data.level}</div>
                </div>
            }
            {data.email &&
                <div className="member-data">
                    <div className="data-label">Email:</div>
                    <div className="data-value">{data.email}</div>
                </div>
            }
            {data.mobile &&
                <div className="member-data">
                    <div className="data-label">Mobile:</div>
                    <div className="data-value">{data.mobile}</div>
                </div>
            }
            {data.address &&
                <div className="member-data">
                    <div className="data-label">Address:</div>
                    <div className="data-value">{data.address}</div>
                </div>
            }
            {data.emName &&
                <div className="member-data">
                    <div className="data-label">Emergency Contact Name:</div>
                    <div className="data-value">{data.emName}</div>
                </div>
            }
            {data.emMobile &&
                <div className="member-data">
                    <div className="data-label">Emergency Contact Mobile:</div>
                    <div className="data-value">{data.emMobile}</div>
                </div>
            }
            {data.emEmail &&
                <div className="member-data">
                    <div className="data-label">Emergency Contact Email:</div>
                    <div className="data-value">{data.emEmail}</div>
                </div>
            }
        </GenericDialog>
    );
};

MemberDetails.propTypes = {
    closeDialog: PropTypes.func.isRequired,
    selectedMemberData: PropTypes.object.isRequired
};

export default MemberDetails;
