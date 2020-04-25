import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import FormContainer from '../../components/Form/FormContainer/FormContainer';
import { nameValidationRule, validationError } from '../../components/ValidationRule';
// import '../../components/Form/InputDisplay/InputDisplay.scss';

class Registration extends Component {
    state = {
        profileImg: '',
        firstName: '',
        lastName: '',
        spiritualName: '',
        firstNameValidationMsg: '',
        lastNameValidationMsg: '',
        spiritualNameValidationMsg: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { profileImg, firstName, lastName, spiritualName } = this.state;
        Client.fetch('/user/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{
                "profileImg": "${profileImg}"
                "firstName": "${firstName}",
                "lastName": "${lastName}",
                "spiritualName": "${spiritualName}"
            }`
        })
            .then(() => {
                window.location.href = '/personal';
            })
            .catch((err) => {
                console.log(err.message);
                window.location.href = '/';
            });

        // if (this.validation(input)) {
        //     this.props.modalValueSave(this.state.currentValue, this.props.modalId);
        //     this.props.modalClose();
        // };
    }

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
        this.setState({ profileImg: newImg });
    };

    // uploadError = (errMsg) => {
    //     this.setState({ showAlert: true, alertMessage: errMsg, alertType: 'Error' });
    // };

    render () {
        const { profileImg, firstName, lastName, spiritualName, firstNameValidationMsg, lastNameValidationMsg, spiritualNameValidationMsg } = this.state;

        return (
            <div className='registration'>
                <header>
                    <h1>Registration to SanghaNet</h1>
                </header>
                <FormContainer formTitle="">
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <InputAvatar
                            profileImg={profileImg}
                            updateProfileImg={this.updateProfileImg}
                            // uploadError={this.uploadError}
                        />
                        <Form.Label htmlFor="firstName" className="display-label">
                            <p className="display-title">First Name</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="firstName"
                            value={firstName}
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
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{lastNameValidationMsg}</span>
                        <Form.Label htmlFor="spiritualName" className="display-label">
                            <p className="display-title">Spiritual Name (in case you have it)</p>
                        </Form.Label>
                        <Form.Control
                            className="display-input"
                            type="text"
                            id="spiritualName"
                            value={spiritualName}
                            onChange={this.handleChange}
                            {...nameValidationRule}
                        ></Form.Control>
                        <span className="error" aria-live="polite">{spiritualNameValidationMsg}</span>
                        <div className="regForm-btns">
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
