import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import FormContainer from '../../components/Form/FormContainer/FormContainer';
import { nameValidationRule, spiritualNameValidationRule, validationError } from '../../components/ValidationRule';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

class Registration extends Component {
    state = {
        profileImgURL: '',
        profileImgBlob: null,
        firstName: '',
        lastName: '',
        spiritualName: '-',
        firstNameValidationToken: null,
        lastNameValidationToken: null,
        spiritualNameValidationToken: null,
        showAlert: false,
        alertMessage: '',
        alertParam: '',
        alertType: ''
    };

    componentDidMount = () => {
        const userStatus = sessionStorage.getItem('userStatus');
        if ( userStatus !== 'unregistered') {
            window.location.href = '/'; // To avoid reach Registration page via URL
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { profileImgBlob, firstName, lastName, spiritualName, firstNameValidationToken, lastNameValidationToken, spiritualNameValidationToken } = this.state;
        if (!(firstNameValidationToken || lastNameValidationToken || spiritualNameValidationToken || !profileImgBlob)) {
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
                    window.history.replaceState({}, '', '/'); // remove registration link from history, make back button useless
                    sessionStorage.setItem('userStatus', 'registered');
                    window.location.href = '/app/personal';
                })
                .catch((err) => {
                    this.setState({ showAlert: true, alertMessage: err.message, alertParam: 'TRYAGAINLATER', alertType: 'ERROR' });
                });
        } else {
            this.setState({ showAlert: true, alertMessage: '', alertParam: 'MANDATORYFIELDS', alertType: 'ERROR' });
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
                [input.id + 'ValidationToken']: validationError(input)
            });
    }

    handleClose = () => {
        document.location.replace('/');
    }

    updateProfileImg = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.name.match(/\.(jpg|jpeg|png|svg|webp)$/i)) {
            this.setState({ showAlert: true, alertMessage: '', alertParam: 'VALIDPHOTO', alertType: 'ERROR' });
            return;
        }
        if (file.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            this.setState({
                profileImgURL: URL.createObjectURL(file),
                profileImgBlob: file
            });
        } else {
            this.setState({ showAlert: true, alertMessage: '', alertParam: 'PHOTOSIZE', alertType: 'ERROR' });
        }
    };

    render () {
        const {
            profileImgURL,
            firstName,
            lastName,
            spiritualName,
            firstNameValidationToken,
            lastNameValidationToken,
            spiritualNameValidationToken,
            showAlert,
            alertMessage,
            alertParam,
            alertType
        } = this.state;

        const { registrationPageDictionary, validationMsg, alert } = this.context.dictionary;
        const {
            REGISTRATIONTITLE,
            FIRSTNAME,
            LASTNAME,
            SPIRITUALNAME,
            PLACEHOLDER,
            LEAVE,
            REGISTRATION
        } = registrationPageDictionary;

        return (
            <div className='registration'>
                { showAlert &&
                    <Alert
                        alertClose={this.closeAlert}
                        alertMsg={alert[alertParam] ? `${alertMessage} ${alert[alertParam]}` : alertMessage}
                        alertType={alertType}
                    />
                }
                <header>
                    <h1>{ REGISTRATIONTITLE }</h1>
                </header>
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
                        <span className="error" aria-live="polite">{validationMsg[firstNameValidationToken]}</span>
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
                        <span className="error" aria-live="polite">{validationMsg[lastNameValidationToken]}</span>
                        <Form.Label htmlFor="spiritualName" className="display-label">
                            <p className="display-title">{ SPIRITUALNAME }</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="spiritualName"
                            value={ spiritualName }
                            placeholder="Start with capital letter, enter minimum 2 characters."
                            onChange={this.handleChange}
                            {...spiritualNameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{validationMsg[spiritualNameValidationToken]}</span>
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
                <LanguageSelector size="small" />
            </div>
        );
    }
};

Registration.contextType = UIcontext;

export default Registration;
