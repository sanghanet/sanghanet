import React from 'react';
import PropTypes from 'prop-types';

import './InputAvatar.scss';

import { Row, Col } from 'react-bootstrap';
// user can't delete the photo - we might want to leave it like that; photo is mandatory
const InputAvatar = (props) => {
    const { profileImgURL, updateProfileImg } = props;

    const uploadText = (profileImgURL) ? 'hide-text' : 'upload-text';
    // FIXME: Avatar has an upper border.
    return (
        <Row className="d-flex justify-content-center avatar-container">
            <Col className="mx-auto my-4 avatar-col">
                <div className="display-input">
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .svg, .webp"
                        name="image"
                        id="file"
                        onChange={updateProfileImg}
                    ></input>
                    <label htmlFor="file" id="file-upload">
                        <p id="upload-text" className={uploadText}>Click here to<br />upload your photo</p>
                        { profileImgURL
                            ? <img src={profileImgURL} id="avatar" className="personal-photo" alt="" />
                            : null
                        }
                    </label>
                </div>
            </Col>
        </Row>
    );
};

InputAvatar.propTypes = {
    profileImgURL: PropTypes.string.isRequired,
    updateProfileImg: PropTypes.func.isRequired
};

export default InputAvatar;
