import React from 'react';
import PropTypes from 'prop-types';
import Client from '../../Client';

import './InputAvatar.scss';

import { Row, Col } from 'react-bootstrap';
// user can't delete the photo - we might want to leave it like that; photo is mandatory
const InputAvatar = (props) => {
    const { profileImgURL, uploadError, updateProfileImgURL, loadImg } = props;

    const loadFile = (event) => {
        const imageToUpload = event.target.files[0];
        if (!imageToUpload) return;
        if (imageToUpload.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            const formData = new FormData();
            formData.append('file', imageToUpload);

            Client.fetch('/user/uploadprofileimg', { method: 'POST', body: formData }, true) // skipDefault Headers
                .then((data) => {
                    updateProfileImgURL(data.profileImgURL);
                }).catch((err) => {
                    uploadError(err.message);
                });
        } else {
            uploadError('Upload a file smaller than 1MB!');
        }
    };

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
                        onChange={loadImg || loadFile}
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
    updateProfileImgURL: PropTypes.func.isRequired,
    uploadError: PropTypes.func.isRequired,
    loadImg: PropTypes.func
};

export default InputAvatar;
