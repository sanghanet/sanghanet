import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { nameValidationRule, addressPattern, mobilePattern } from '../../components/ValidationRule';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import { Row } from 'react-bootstrap';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

class Personal extends React.Component {
    static contextType = UIcontext;

    state = {
        openDetails: false,
        profileImgURL: '',
        firstName: '',
        firstNameVisible: true,
        lastName: '',
        lastNameVisible: true,
        spiritualName: '',
        spiritualNameVisible: true,
        birthday: '',
        birthdayVisible: false,
        gender: '',
        genderVisible: false,
        level: '',
        levelVisible: false,
        email: '',
        emailVisible: false,
        mobile: '',
        mobileVisible: false,
        address: '',
        addressVisible: false,
        emName: '',
        emMobile: '',
        emEmail: '',
        emContactVisible: false,
        showAlert: false,
        alertMessage: '',
        alertType: ''
    };

    componentDidMount () {
        Client.fetch('/user/personal')
            .then((data) => {
                this.setState({
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    profileImgURL: data[0].profileImg,
                    spiritualName: data[0].spiritualName,
                    birthday: data[0].birthday,
                    birthdayVisible: data[0].birthdayVisible,
                    gender: data[0].gender,
                    genderVisible: data[0].genderVisible,
                    email: data[0].email,
                    emailVisible: data[0].emailVisible,
                    mobile: data[0].mobile,
                    mobileVisible: data[0].mobileVisible,
                    level: data[0].level,
                    levelVisible: data[0].levelVisible,
                    address: data[0].address,
                    addressVisible: data[0].addressVisible,
                    emName: data[0].emName,
                    emMobile: data[0].emMobile,
                    emEmail: data[0].emEmail,
                    emContactVisible: data[0].emContactVisible
                });

                this.context.setAccess(
                    data[1].isSuperuser,
                    data[1].isFinanceAdmin,
                    data[1].isEventAdmin,
                    data[1].isYogaAdmin
                );
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    };

    toggleDetails = () => {
        this.setState((oldState) => ({ openDetails: !oldState.openDetails }));
    };

    updateItem = (data) => {
        this.setState((oldState) => ({
            ...oldState,
            ...data,
            showAlert: true,
            alertMessage: 'Data saved successfully!',
            alertType: 'Info'
        }));
    };

    handleItemSave = (newValue, id) => {
        Client.fetch('/user/saveitem', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `{"${id}": "${newValue}"}`
        })
            .then((data) => {
                this.updateItem(data);
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    };

    handleItemVisibility = (id) => {
        const Visible = `${[id]}Visible`;
        Client.fetch('/user/savevisibility', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `{"${Visible}": "${!this.state[Visible]}"}`
        })
            .then((data) => {
                this.updateItem(data);
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    };

    updateProfileImg = (event) => {
        const imageToUpload = event.target.files[0];
        if (!imageToUpload) return;
        if (!imageToUpload.name.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
            this.setState({ showAlert: true, alertMessage: 'Please select valid photo.', alertType: 'Error' });
            return false;
        }
        if (imageToUpload.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            const formData = new FormData();
            formData.append('file', imageToUpload);

            Client.fetch('/user/uploadprofileimg', { method: 'POST', body: formData }, true) // skipDefault Headers
                .then((data) => {
                    this.setState({ profileImgURL: data.profileImg });
                }).catch((err) => {
                    this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
                });
        } else {
            this.setState({ showAlert: true, alertMessage: 'Upload a file smaller than 1MB!', alertType: 'Error' });
        }
    };

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    };

    render () {
        const {
            openDetails,
            profileImgURL,
            firstName, firstNameVisible,
            lastName, lastNameVisible,
            birthday, birthdayVisible,
            spiritualName, spiritualNameVisible,
            gender, genderVisible,
            level, levelVisible,
            email, emailVisible,
            mobile, mobileVisible,
            address, addressVisible,
            emContactVisible,
            emName, emMobile, emEmail,
            showAlert, alertMessage, alertType
        } = this.state;
        // used to change name in the Header
        sessionStorage.setItem('user', `${firstName} ${lastName}`);
        return (
            <div>
                <Header activePage="Personal" />
                <Navbar navStyle="sidenav" />
                <main>
                    { showAlert
                        ? <Alert
                            alertClose={this.closeAlert}
                            alertMsg={alertMessage}
                            alertType={alertType}
                        />
                        : null
                    }
                    <FormContainer formTitle="general data" mb-4>
                        <React.Fragment>
                            <InputAvatar
                                profileImgURL={profileImgURL}
                                updateProfileImg={this.updateProfileImg}
                            />
                            <Row>
                                <InputDisplay
                                    inputTitle="First name"
                                    inputValue={firstName}
                                    validation={nameValidationRule}
                                    // inputId value should be the same as inputValue value
                                    inputId="firstName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={firstNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                    format="Maria-Luiza"
                                />
                                <InputDisplay
                                    inputTitle="Last name"
                                    inputValue={lastName}
                                    validation={nameValidationRule}
                                    inputId="lastName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={lastNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                    format="Dr. Ribeiro"
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Spiritual name"
                                    inputValue={spiritualName}
                                    validation={nameValidationRule}
                                    inputId="spiritualName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={spiritualNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                    format="Flower Power"
                                />
                                <InputDisplay
                                    inputTitle="Date of birth"
                                    inputValue={birthday}
                                    validation={{
                                        min: '1910-01-01',
                                        max: '2002-01-01' // current year minus 18
                                    }}
                                    inputId="birthday"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={birthdayVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="date"
                                    format="month/day/year"
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Gender"
                                    inputValue={gender}
                                    inputId="gender"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={genderVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputFieldAs="select"
                                    // empty string - if one does not want to indicate gender
                                    optionsForSelect={['', 'Female', 'Male', 'Other']}
                                />
                                <InputDisplay
                                    inputTitle="Level of study"
                                    inputValue={level}
                                    inputId="level"
                                    inputVisible={levelVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    toDisable={ new Set(['edit']) }
                                    // since field is non-editable below props are meaningless
                                    // inputValueSave={this.handleItemSave}
                                    // inputFieldAs="select"
                                    // optionsForSelect={['Beginner', 'Intermediate', 'Advanced']}
                                />
                            </Row>
                        </React.Fragment>
                    </FormContainer>
                    <FormContainer formTitle="contact details">
                        <React.Fragment>
                            <Row>
                                <InputDisplay
                                    inputTitle="Email"
                                    inputValue={email}
                                    inputId="email"
                                    inputVisible={emailVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    toDisable={ new Set(['edit']) }
                                    // since field is non-editable below props are meaningless
                                    // inputValueSave={this.handleItemSave}
                                    // inputType="email"
                                />
                                <InputDisplay
                                    inputTitle="Mobile"
                                    inputValue={mobile}
                                    validation={{
                                        pattern: mobilePattern
                                    }}
                                    inputId="mobile"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={mobileVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="tel"
                                    format="70/44-66-052"
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Address"
                                    inputValue={address}
                                    validation={{
                                        minLength: 2,
                                        maxLength: 62,
                                        pattern: addressPattern
                                    }}
                                    inputId="address"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={addressVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    format="1055 Budapest, Csalogany u. 26 B/12"
                                />
                                <InputDropdown
                                    dropdownTitle="Emergency Contact"
                                    dropdownId="emContact"
                                    inputArray={[
                                        { inputTitle: 'Emergency Contact Name', inputValue: emName, inputId: 'emName', inputType: 'text', validation: nameValidationRule, format: 'Maria Doe' },
                                        { inputTitle: 'Emergency Contact Mobile', inputValue: emMobile, inputId: 'emMobile', inputType: 'mobile', validation: { pattern: mobilePattern }, format: '70/44-66-052' },
                                        { inputTitle: 'Emergency Contact Email', inputValue: emEmail, inputId: 'emEmail', inputType: 'text', format: 'maria.doe@gmail.com' }
                                    ]}
                                    inputValueSave={this.handleItemSave}
                                    dropdownVisible={emContactVisible}
                                    dropdownVisibility={this.handleItemVisibility}
                                    dropdownArrow={openDetails}
                                    toggleDropdown={this.toggleDetails}
                                />
                            </Row>
                        </React.Fragment>
                    </FormContainer>
                </main>
                <Footer />
            </div>
        );
    };
}

export default Personal;
