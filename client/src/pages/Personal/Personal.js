import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import Client from '../../components/Client';
import { Row } from 'react-bootstrap';
import './Personal.scss';

class Personal extends React.Component {
    state = {
        openDetails: false,
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
        dropdownVisible: false,
        emName: '',
        emMobile: '',
        emEmail: ''
    }

    componentDidMount () {
        Client.fetch('/user/personal')
            .then((data) => {
                this.setState({
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
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
                    dropdownVisible: data[0].emContactVisible
                });
            // eslint-disable-next-line handle-callback-err
            }).catch((err) => {
                // Give warning to the user or handle error here..
            });
    }

    toggleDetails = () => {
        this.setState((oldState) => ({ openDetails: !oldState.openDetails }));
    };

    handleItemSave = (newValue, id) => {
        // TODO: Store user's first name in BE. In case of failure, display warning.
        Client.fetch('/user/saveitem', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `{"${id}": "${newValue}"}`
        })
            .then((data) => {
                this.setState((oldState) => ({
                    ...oldState,
                    ...data
                }));
            // eslint-disable-next-line handle-callback-err
            }).catch((err) => {
                // Give warning to the user or handle error here..
            });
    };

    handleItemVisibility = (id) => {
        // TODO: change visibility in BE. In case of failure, display warning.
        const Visible = `${[id]}Visible`;
        this.setState((oldState) => ({ [Visible]: !oldState[Visible] }));
    }

    render () {
        const {
            openDetails,
            firstName, firstNameVisible,
            lastName, lastNameVisible,
            birthday, birthdayVisible,
            spiritualName, spiritualNameVisible,
            gender, genderVisible,
            level, levelVisible,
            email, emailVisible,
            mobile, mobileVisible,
            address, addressVisible,
            dropdownVisible,
            emName, emMobile, emEmail
        } = this.state;
        // used to change name in the Header
        sessionStorage.setItem('user', `${firstName} ${lastName}`);
        return (
            <div>
                <Header activePage="Personal" />
                <Navbar />
                <main>
                    <FormContainer formTitle="general data" mb-4>
                        <React.Fragment>
                            <InputAvatar />
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
                                    dropdownId="dropdown"
                                    inputArray={[
                                        { inputTitle: 'Emergency Contact Name', inputValue: emName, inputId: 'emName', inputType: 'text' },
                                        { inputTitle: 'Emergency Contact Mobile', inputValue: emMobile, inputId: 'emMobile', inputType: 'mobile' },
                                        { inputTitle: 'Emergency Contact Email', inputValue: emEmail, inputId: 'emEmail', inputType: 'email' }
                                    ]}
                                    inputValueSave={this.handleItemSave}
                                    dropdownVisible={dropdownVisible}
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
