import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import { Row } from 'react-bootstrap';
import './Personal.scss';

class Personal extends React.Component {
    state = {
        openDetails: false,
        firstName: 'Baby',
        firstNameIsVisible: true,
        lastName: 'Yoda',
        lastNameIsVisible: true,
        spiritualName: 'Jedi Master',
        spiritualNameIsVisible: true,
        birthday: '07-31-1987',
        birthdayIsVisible: true,
        gender: 'Female',
        genderIsVisible: true,
        level: 'Intermediate',
        levelIsVisible: true,
        email: 'name@gmail.com',
        emailIsVisible: true,
        mobile: '30/88 77 087',
        mobileIsVisible: true,
        address: '1064 Budapest, Rozsa u. 23 B45',
        addressIsVisible: true,
        dropdownIsVisible: true,
        emName: 'My emergency contact',
        emMobile: '30/33 77 888',
        emEmail: 'emergency.email@info.com'
    }

    toggleDetails = () => {
        this.setState((oldState) => ({ openDetails: !oldState.openDetails }));
    };

    handleItemSave = (newValue, id) => {
        // TODO: Store user's first name in BE. In case of failure, display warning.
        this.setState({ [id]: newValue });
    };

    handleItemVisibility = (id) => {
        // TODO: change visibility in BE. In case of failure, display warning.
        const isVisible = `${[id]}IsVisible`;
        this.setState((oldState) => ({ [isVisible]: !oldState[isVisible] }));
    }

    render () {
        const {
            openDetails,
            firstName, firstNameIsVisible,
            lastName, lastNameIsVisible,
            birthday, birthdayIsVisible,
            spiritualName, spiritualNameIsVisible,
            gender, genderIsVisible,
            level, levelIsVisible,
            email, emailIsVisible,
            mobile, mobileIsVisible,
            address, addressIsVisible,
            dropdownIsVisible,
            emName, emMobile, emEmail
        } = this.state;

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
                                    inputIsVisible={firstNameIsVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                />
                                <InputDisplay
                                    inputTitle="Last name"
                                    inputValue={lastName}
                                    inputId="lastName"
                                    inputValueSave={this.handleItemSave}
                                    inputIsVisible={lastNameIsVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                />
                            </Row>
                            <Row>
                                <InputDisplay
                                    inputTitle="Spiritual name"
                                    inputValue={spiritualName}
                                    inputId="spiritualName"
                                    inputValueSave={this.handleItemSave}
                                    inputIsVisible={spiritualNameIsVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="text"
                                />
                                <InputDisplay
                                    inputTitle="Date of birth"
                                    inputValue={birthday}
                                    inputId="birthday"
                                    inputValueSave={this.handleItemSave}
                                    inputIsVisible={birthdayIsVisible}
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
                                    inputIsVisible={genderIsVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputFieldAs="select"
                                    optionsForSelect={['Female', 'Male', 'Other']}
                                />
                                <InputDisplay
                                    inputTitle="Level of study"
                                    inputValue={level}
                                    inputId="level"
                                    inputValueSave={this.handleItemSave}
                                    inputIsVisible={levelIsVisible}
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
                                    inputIsVisible={emailIsVisible}
                                    inputVisibility={this.handleItemVisibility}
                                    inputType="email"
                                />
                                <InputDisplay
                                    inputTitle="Mobile"
                                    inputValue={mobile}
                                    inputId="mobile"
                                    inputValueSave={this.handleItemSave}
                                    inputIsVisible={mobileIsVisible}
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
                                    inputIsVisible={addressIsVisible}
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
                                    dropdownIsVisible={dropdownIsVisible}
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
