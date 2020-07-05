/* eslint-disable dot-notation */

import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import FormContainer from '../../components/Form/FormContainer/FormContainer';
import { nameValidationRule, validationError } from '../../components/ValidationRule';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

class Registration extends Component {
    static contextType = UIcontext
    state = {
        profileImgURL: '',
        profileImgBlob: null,
        firstName: '',
        lastName: '',
        spiritualName: 'None',
        firstNameValidationMsg: null,
        lastNameValidationMsg: null,
        spiritualNameValidationMsg: null,
        showAlert: false,
        alertMessage: '',
        alertType: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { profileImgBlob, firstName, lastName, spiritualName, firstNameValidationMsg, lastNameValidationMsg, spiritualNameValidationMsg } = this.state;
        if (!(firstNameValidationMsg || lastNameValidationMsg || spiritualNameValidationMsg || !profileImgBlob)) {
            const formData = new FormData();
            formData.append('profileImage', profileImgBlob);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('spiritualName', spiritualName);
            Client.fetch('/user/registration', {
                method: 'POST',
                body: formData
            }, true) // skipDefault Headers
                .then(() => {
                    window.location.href = '/app/personal';
                })
                .catch((err) => {
                    this.setState({ showAlert: true, alertMessage: `${err.message}. Try again later.`, alertType: 'Error' });
                });
        } else {
            this.setState({ showAlert: true, alertMessage: 'All 4 fields are mandatory!', alertType: 'Error' });
        }
    }

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    };

    handleChange = (event) => {
        const input = event.target;
        this.setState(
            {
                [input.id]: input.value,
                [input.id + 'ValidationMsg']: validationError(input)
            });
    }

    handleClose = () => {
        document.location.replace('/');
    }

    updateProfileImg = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.name.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
            this.setState({ showAlert: true, alertMessage: 'Please select valid photo.', alertType: 'Error' });
            return;
        }
        if (file.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            this.setState({
                profileImgURL: URL.createObjectURL(file),
                profileImgBlob: file
            });
        } else {
            this.setState({ showAlert: true, alertMessage: 'Upload a file smaller than 1MB!', alertType: 'Error' });
        }
    };

    render () {
        const {
            profileImgURL,
            firstName,
            lastName,
            spiritualName,
            firstNameValidationMsg,
            lastNameValidationMsg,
            spiritualNameValidationMsg,
            showAlert,
            alertMessage,
            alertType
        } = this.state;

        const dictionary = this.context.dictionary;
        const REGISTRATIONTITLE = dictionary['registrationtitle'];
        const FIRSTNAME = dictionary['firstname'];
        const LASTNAME = dictionary['lastname'];
        const SPIRITUALNAME = dictionary['spiritualname'];
        const PLACEHOLDER = dictionary['placeholder'];
        const LEAVE = dictionary['leave'];
        const REGISTRATION = dictionary['registration'];

        return (
            <div className='registration'>
                { showAlert
                    ? <Alert
                        alertClose={this.closeAlert}
                        alertMsg={alertMessage}
                        alertType={alertType}
                    />
                    : null
                }
                <header>
                    <h1>{ REGISTRATIONTITLE }</h1>
                </header>
                <LanguageSelector />
                <FormContainer formTitle="">
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <InputAvatar
                            profileImgURL={profileImgURL}
                            updateProfileImg={this.updateProfileImg}
                        />
                        <Form.Label htmlFor="firstName" className="display-label">
                            <p className="display-title">{ FIRSTNAME }</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="firstName"
                            value={firstName}
                            placeholder={ PLACEHOLDER }
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{firstNameValidationMsg}</span>
                        <Form.Label htmlFor="lastName" className="display-label">
                            <p className="display-title">{ LASTNAME }</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="lastName"
                            value={lastName}
                            placeholder={ PLACEHOLDER }
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{lastNameValidationMsg}</span>
                        <Form.Label htmlFor="spiritualName" className="display-label">
                            <p className="display-title">{ SPIRITUALNAME }</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="spiritualName"
                            value={spiritualName}
                            placeholder="Start with capital letter, enter minimum 2 characters."
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{spiritualNameValidationMsg}</span>
                        <div className="regForm-btns">
                            <Button variant="outline-secondary" onClick={this.handleClose}>
                                { LEAVE }
                            </Button>
                            <Button onClick={this.handleSubmit} variant="outline-success" className="reg-btn">
                                { REGISTRATION }
                            </Button>
                        </div>
                    </Form>
                </FormContainer>
            </div>
        );
    }
};

export default Registration;
