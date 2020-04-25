import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import FormContainer from '../../components/Form/FormContainer/FormContainer';
import { nameValidationRule, validationError } from '../../components/ValidationRule';
// import '../../components/Form/InputDisplay/InputDisplay.scss';

class Registration extends Component {
    state = {
        profileImgURL: '',
        firstName: '',
        lastName: '',
        spiritualName: 'None',
        firstNameValidationMsg: null,
        lastNameValidationMsg: null,
        spiritualNameValidationMsg: null,
        showAlert: false
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { profileImgURL, firstName, lastName, spiritualName, firstNameValidationMsg, lastNameValidationMsg, spiritualNameValidationMsg } = this.state;
        if (!(firstNameValidationMsg || lastNameValidationMsg || spiritualNameValidationMsg || profileImgURL === '')) {
            const formData = new FormData();
            formData.append('profileImgBlob', null);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('spiritualName', spiritualName);
            console.dir(formData);
            Client.fetch('/user/registration', {
                method: 'POST',
                body: formData
            })
                .then(() => {
                    window.location.href = '/personal';
                })
                .catch((err) => {
                    console.log(err.message);
                    window.location.href = '/';
                });
        } else {
            this.setState({ showAlert: true });
        }
    }

    closeAlert = () => {
        this.setState({ showAlert: false });
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

    updateProfileImg = (newImg) => {
        // this.setState({ profileImgURL: newImg });
    };

    handleLoadImg = (event) => {
        // console.dir(event.target.files);
        // TODO: check size and Cancel
        this.setState({ profileImgURL: URL.createObjectURL(event.target.files[0]) });
    }

    // uploadError = (errMsg) => {
    //     this.setState({ showAlert: true, alertMessage: errMsg, alertType: 'Error' });
    // };

    render () {
        const { profileImgURL, firstName, lastName, spiritualName, firstNameValidationMsg, lastNameValidationMsg, spiritualNameValidationMsg, showAlert } = this.state;

        return (
            <div className='registration'>
                { showAlert
                    ? <Alert
                        alertClose={this.closeAlert}
                        alertMsg='Insert valid data and/or add your photo!'
                        alertType='Error'
                    />
                    : null
                }
                <header>
                    <h1>Registration to SanghaNet</h1>
                </header>
                <FormContainer formTitle="">
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <InputAvatar
                            profileImgURL={profileImgURL}
                            updateProfileImgURL={this.updateProfileImg}
                            // uploadError={this.uploadError}
                            loadImg={this.handleLoadImg}
                        />
                        <Form.Label htmlFor="firstName" className="display-label">
                            <p className="display-title">First Name</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="firstName"
                            value={firstName}
                            placeholder="Start with capital letter, enter minimum 2 characters."
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{firstNameValidationMsg}</span>
                        <Form.Label htmlFor="lastName" className="display-label">
                            <p className="display-title">Last Name</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="lastName"
                            value={lastName}
                            placeholder="Start with capital letter, enter minimum 2 characters."
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{lastNameValidationMsg}</span>
                        <Form.Label htmlFor="spiritualName" className="display-label">
                            <p className="display-title">Spiritual Name in case you have it, otherwise &quot;None&quot;</p>
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
                            {// FIXME: Buttons on mobile view do not display nice
                            }
                            <Button variant="outline-secondary" onClick={this.handleClose}>
                                Leave
                            </Button>
                            <Button onClick={this.handleSubmit} variant="outline-success" className="reg-btn">
                                Registration
                            </Button>
                        </div>
                    </Form>
                </FormContainer>
            </div>
        );
    }
};

export default Registration;
