import React from 'react';
import PropTypes from 'prop-types';

import './InputAvatar.scss';

import { Row, Col } from 'react-bootstrap';
// user can't delete the photo - we might want to leave it like that; photo is mandatory
const InputAvatar = (props) => {
    const { profileImg, fileSizeError } = props;

    const loadFile = (event) => {
        const uploadedImg = event.target.files[0];
        if (uploadedImg.size < 100) { // 1048576 = 1 MB 1024*1024 byte
            console.dir(uploadedImg); // name
        } else {
            fileSizeError();
        }
        // to ensure that user did not Cancel the upload
        // if (uploadedImg !== undefined) {
        //     const image = document.getElementById('avatar');
        //     image.src = URL.createObjectURL(uploadedImg);
        // }
        // // once the photo is uploaded make the text transparent
        // const uploadText = document.getElementById('upload-text');
        // uploadText.className = 'hide-text';
    };

    return (
        <Row className="d-flex justify-content-center avatar-container">
            <Col className="mx-auto my-4 avatar-col">
                <div className="display-input">
                    <input type="file" accept="image/*" name="image" id="file" onChange={loadFile}></input>
                    <label htmlFor="file" id="file-upload">
                        <p id="upload-text" className="upload-text">Click here to<br />upload your photo</p>
                        <img src={profileImg} id="avatar" className="personal-photo" alt=""></img>
                    </label>
                </div>
            </Col>
        </Row>
    );
};

InputAvatar.propTypes = {
    profileImg: PropTypes.string.isRequired,
    fileSizeError: PropTypes.func.isRequired
};

export default InputAvatar;
