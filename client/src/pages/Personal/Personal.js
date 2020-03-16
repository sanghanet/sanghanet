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
// import ArrowDown from '../../components/icons/arrow-down.svg';
// import ArrowUp from '../../components/icons/arrow-up.svg';

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
                    {/* <Row>
                                <InputDropdown open={false} >
                                    <React.Fragment>
                                        <Input
                                            formId="first-dropdown-item"
                                            inputTitle="Name"
                                            type="text"
                                        />
                                        <Input
                                            inputTitle="Email"
                                            type="email"
                                        />
                                        <Input
                                            formId="last-dropdown-item"
                                            inputTitle="Mobile"
                                            type="tel"
                                        />
                                    </React.Fragment>
                                </InputDropdown>
                            </Row> */}
                    {/* <div className="contact-details personal-blocks">
                            <h2 className="personal-form-h2">CONTACT DETAILS</h2>
                            <div className="personal-form-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="my.name@gmail.com" required></input>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="tel" id="mobile" name="mobile" placeholder="70/66 89 456" maxLength="20" required></input>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" placeholder="1045 Budapest, Rozsa u. 25/8"></input>
                            </div>
                            <details open={this.state.openDetails}>
                                <summary className="personal-form-field em-name">
                                    <label htmlFor="Emergency Contact Name" onClick={this.toggleDetails}>
                                        Emergency contact
                                        <img src={ArrowUp} className="arrow" alt=""></img>
                                    </label>
                                    <input type="text" id="Emergency Contact Name" name="Emergency Contact Name" placeholder="Contact Name"></input>
                                </summary>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="em-email">Email</label>
                                    <input type="email" id="em-email" name="em-email" placeholder="her.name@gmail.com"></input>
                                </div>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="emMobile" className="em-mobile-lable">Mobile</label>
                                    <input type="tel" id="emMobile" name="emMobile" placeholder="70/77 23 456" maxLength="20"></input>
                                </div>
                            </details>
                        </div>
                        <div className="yoga-ranking personal-blocks">
                            <h2 className="personal-form-h2">YOGA RANKING</h2>
                            <div className="personal-form-field">
                                <label htmlFor="meditation">Meditation score</label>
                                <input type="number" id="meditation" name="meditation" min="1" max="100"></input>
                            </div>
                            <div className="personal-form-field select-container">
                                <label htmlFor="martial-art">Martial Art Belt</label>
                                <select id="martial-art">
                                    <option value="white" className="white-belt">White</option>
                                    <option value="yellow" className="yellow-belt">Yellow</option>
                                    <option value="orange" className="orange-belt">Orange</option>
                                    <option value="green" className="green-belt">Green</option>
                                    <option value="blue" className="blue-belt">Blue</option>
                                    <option value="brown" className="brown-belt">Brown</option>
                                    <option value="black" className="black-belt">Black</option>
                                </select>
                            </div>
                            <details open={this.state.openDetails}>
                                <summary className="personal-form-field em-name">
                                    <label htmlFor="book" onClick={this.toggleDetails}>
                                        Books
                                        <img src={ArrowUp} className="arrow" alt=""></img>
                                    </label>
                                </summary>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="book" className="books">
                                        Click to add a new book...
                                        <img src={Plus} alt="" className="plus"></img>
                                    </label>
                                </div>
                                <div className="personal-form-field em-field">
                                    <input type="text" id="book" name="book" placeholder="Author and title of the book..."></input>
                                </div>
                                <div className="personal-form-field em-field">
                                    <input type="text" name="book" placeholder="Author and title of the book..."></input>
                                </div>
                            </details>
                        </div>
                    </form> */}
                </main>
                <Footer />
            </div>
        );
    };
}

export default Personal;
