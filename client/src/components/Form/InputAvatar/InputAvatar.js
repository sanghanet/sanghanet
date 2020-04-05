import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../Client';

import './InputAvatar.scss';

import { Row, Col } from 'react-bootstrap';
// user can't delete the photo - we might want to leave it like that; photo is mandatory
const InputAvatar = (props) => {
    const { profileImg, fileSizeError, uploadError, updateProfileImg } = props;

    const loadFile = (event) => {
        const uploadedImg = event.target.files[0];
        if (uploadedImg.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            Client.fetch('/user/uploadprofileimg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: `{"profileImg": "${uploadedImg.name}"}`
            })
                .then((data) => {
                    updateProfileImg(data.profileImg);
                }).catch((err) => {
                    uploadError(err.message);
                });
        } else {
            fileSizeError();
        }
        // to ensure that user did not Cancel the upload
        // if (uploadedImg !== undefined) {
        //     const image = document.getElementById('avatar');
        //     image.src = URL.createObjectURL(uploadedImg);
        // }
    };

    const uploadText = (profileImg) ? 'hide-text' : 'upload-text';

    return (
        <Row className="d-flex justify-content-center avatar-container">
            <Col className="mx-auto my-4 avatar-col">
                <div className="display-input">
                    <input type="file" accept="image/*" name="image" id="file" onChange={loadFile}></input>
                    <label htmlFor="file" id="file-upload">
                        <p id="upload-text" className={uploadText}>Click here to<br />upload your photo</p>
                        <img src={`images/${profileImg}`} id="avatar" className="personal-photo" alt=""></img>
                    </label>
                </div>
            </Col>
        </Row>
    );
};

InputAvatar.propTypes = {
    profileImg: PropTypes.string.isRequired,
    fileSizeError: PropTypes.func.isRequired,
    updateProfileImg: PropTypes.func.isRequired,
    uploadError: PropTypes.func
};

export default InputAvatar;
