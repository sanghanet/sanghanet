import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import { Row } from 'react-bootstrap';

class Personal extends React.Component {
    state = {
        openDetails: false,
        profileImg: '',
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
                    profileImg: data[0].profileImg,
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

    uploadError = (errMsg) => {
        this.setState({ showAlert: true, alertMessage: errMsg, alertType: 'Error' });
    };

    updateProfileImg = (newImg) => {
        this.setState({ profileImg: newImg });
    };

    closeAlert = () => {
        this.setState({ showAlert: false, alertMessage: '', alertType: '' });
    };

    render () {
        const {
            openDetails,
            profileImg,
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
                                profileImg={profileImg}
                                updateProfileImg={this.updateProfileImg}
                                uploadError={this.uploadError}
                            />
                            <Row>
                                <InputDisplay
                                    inputTitle="First name"
                                    inputValue={firstName}
                                    // inputId value should be the same as inputValue value
                                    inputId="firstName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={firstNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                />
                                <InputDisplay
                                    inputTitle="Last name"
                                    inputValue={lastName}
                                    inputId="lastName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={lastNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Spiritual name"
                                    inputValue={spiritualName}
                                    inputId="spiritualName"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={spiritualNameVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                    toDisable={ new Set(['visibility']) }
                                />
                                <InputDisplay
                                    inputTitle="Date of birth"
                                    inputValue={birthday}
                                    inputId="birthday"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={birthdayVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="date"
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
                                    optionsForSelect={['Female', 'Male', 'Other']}
                                />
                                <InputDisplay
                                    inputTitle="Level of study"
                                    inputValue={level}
                                    inputId="level"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={levelVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputFieldAs="select"
                                    optionsForSelect={['Beginner', 'Intermediate', 'Advanced']}
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
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={emailVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="email"
                                    toDisable={ new Set(['edit']) }
                                />
                                <InputDisplay
                                    inputTitle="Mobile"
                                    inputValue={mobile}
                                    inputId="mobile"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={mobileVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="tel"
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Address"
                                    inputValue={address}
                                    inputId="address"
                                    inputValueSave={this.handleItemSave}
                                    inputVisible={addressVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                />
                                <InputDropdown
                                    dropdownTitle="Emergency Contact"
                                    dropdownId="emContact"
                                    inputArray={[
                                        { inputTitle: 'Emergency Contact Name', inputValue: emName, inputId: 'emName', inputType: 'text' },
                                        { inputTitle: 'Emergency Contact Mobile', inputValue: emMobile, inputId: 'emMobile', inputType: 'mobile' },
                                        { inputTitle: 'Emergency Contact Email', inputValue: emEmail, inputId: 'emEmail', inputType: 'email' }
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
