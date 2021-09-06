import React, { useState, useEffect, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import FormContainer from '../../components/Form/FormContainer/FormContainer';
import { nameValidationRule, spiritualNameValidationRule, validationError } from '../../components/ValidationRule';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { RouteComponentProps } from 'react-router-dom';

const Registration: React.FC<RouteComponentProps> = (props) => {
    const [profileImgURL, setProfileImgURL] = useState<string>('');
    const [profileImgBlob, setProfileImgBlob] = useState<Blob | null>(null);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [spiritualName, setSpiritualName] = useState<string>('-');
    const [firstNameValidationToken, setFirstNameValidationToken] = useState<string>('');
    const [lastNameValidationToken, setLastNameValidationToken] = useState<string>('');
    const [spiritualNameValidationToken, setSpiritualNameValidationToken] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertParam, setAlertParam] = useState<string>('');
    const [alertType, setAlertType] = useState<ALERT>('NOALERT');

    const { registrationPageDictionary, validationMsg, alert } = useContext(UIcontext).dictionary;
    const {
        REGISTRATIONTITLE,
        FIRSTNAME,
        LASTNAME,
        SPIRITUALNAME,
        PLACEHOLDER,
        LEAVE,
        REGISTRATION
    } = registrationPageDictionary;

    useEffect(() => {
        const userStatus = sessionStorage.getItem('userStatus');
        if (userStatus !== 'unregistered') {
            window.location.href = '/'; // To avoid reach Registration page via URL
        }
    }, []);

    const setAlert = (showAlert: boolean, alertMessage: string, alertParam: string, alertType: ALERT): void => {
        setShowAlert(showAlert);
        setAlertMessage(alertMessage);
        setAlertParam(alertParam);
        setAlertType(alertType);
    };

    const closeAlert = (): void => setAlert(false, '', '', 'NOALERT');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement, MouseEvent>): void => {
        event.preventDefault();

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
                .catch((err) => setAlert(true, err.message, 'TRYAGAINLATER', 'ERROR'));
        } else {
            setAlert(true, '', 'MANDATORYFIELDS', 'ERROR');
        }
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target;
        setFirstName(input.value);
        setFirstNameValidationToken(validationError(input));
    };
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target;
        setLastName(input.value);
        setLastNameValidationToken(validationError(input));
    };
    const handleSpiritualNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const input = event.target;
        setSpiritualName(input.value);
        setSpiritualNameValidationToken(validationError(input));
    };

    const handleClose = (): void => {
        Client.fetch('/user/logout').catch();
        window.location.href = '/';
    };

    const updateProfileImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png|svg|webp)$/i)) {
            setAlert(true, '', 'VALIDPHOTO', 'ERROR');
            return;
        }
        if (file.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            setProfileImgURL(URL.createObjectURL(file));
            setProfileImgBlob(file);
        } else {
            setAlert(true, '', 'PHOTOSIZE', 'ERROR');
        }
    };

    return (
        <div className="registration">
            {showAlert &&
                <Alert
                    alertClose={closeAlert}
                    alertMsg={alert[alertParam] ? `${alertMessage} ${alert[alertParam]}` : alertMessage}
                    alertType={alertType}
                />}
            <header>
                <h1>{REGISTRATIONTITLE}</h1>
            </header>
            <FormContainer formTitle="">
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <InputAvatar
                        profileImgURL={profileImgURL}
                        updateProfileImg={updateProfileImg}
                    />
                    <Form.Label htmlFor="firstName" className="display-label">
                        <p className="display-title">{FIRSTNAME}</p>
                    </Form.Label>
                    <Form.Control
                        className="display-input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        placeholder={PLACEHOLDER}
                        onChange={handleFirstNameChange}
                        {...nameValidationRule}
                    />
                    <span className="error" aria-live="polite">{validationMsg[firstNameValidationToken]}</span>
                    <Form.Label htmlFor="lastName" className="display-label">
                        <p className="display-title">{LASTNAME}</p>
                    </Form.Label>
                    <Form.Control
                        className="display-input"
                        type="text"
                        id="lastName"
                        value={lastName}
                        placeholder={PLACEHOLDER}
                        onChange={handleLastNameChange}
                        {...nameValidationRule}
                    />
                    <span className="error" aria-live="polite">{validationMsg[lastNameValidationToken]}</span>
                    <Form.Label htmlFor="spiritualName" className="display-label">
                        <p className="display-title">{SPIRITUALNAME}</p>
                    </Form.Label>
                    <Form.Control
                        className="display-input"
                        type="text"
                        id="spiritualName"
                        value={spiritualName}
                        placeholder={PLACEHOLDER}
                        onChange={handleSpiritualNameChange}
                        {...spiritualNameValidationRule}
                    />
                    <span className="error" aria-live="polite">{validationMsg[spiritualNameValidationToken]}</span>
                    <div className="regForm-btns">
                        <Button variant="outline-secondary" onClick={handleClose}>
                            {LEAVE}
                        </Button>
                        <Button onClick={handleSubmit} variant="outline-success" className="reg-btn">
                            {REGISTRATION}
                        </Button>
                    </div>
                </Form>
            </FormContainer>
            <LanguageSelector size="small" />
        </div>
    );
};

export default Registration;
