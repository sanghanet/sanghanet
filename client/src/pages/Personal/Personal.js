import React from 'react';

import { nameValidationRule, spiritualNameValidationRule, addressPattern, mobilePattern } from '../../components/ValidationRule';

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

                // used in header to show user's name
                sessionStorage.setItem('user', `${data[0].firstName} ${data[0].lastName}`);
            }).catch((err) => {
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
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
            alertMessage: 'SAVEDSUCCESSFULLY',
            alertType: 'INFO'
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
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
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
                this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
            });
    };

    updateProfileImg = (event) => {
        const imageToUpload = event.target.files[0];
        if (!imageToUpload) return;
        if (!imageToUpload.name.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
            this.setState({ showAlert: true, alertMessage: 'VALIDPHOTO', alertType: 'ERROR' });
            return false;
        }
        if (imageToUpload.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            const formData = new FormData();
            formData.append('file', imageToUpload);

            Client.fetch('/user/uploadprofileimg', { method: 'POST', body: formData }, true) // skipDefault Headers
                .then((data) => {
                    this.setState({ profileImgURL: data.profileImg });
                }).catch((err) => {
                    this.setState({ showAlert: true, alertMessage: err.message, alertType: 'ERROR' });
                });
        } else {
            this.setState({ showAlert: true, alertMessage: 'PHOTOSIZE', alertType: 'ERROR' });
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

        const {
            FIRSTNAME,
            LASTNAME,
            SPIRITUALNAME,
            DATEOFBIRTH,
            GENDER,
            LEVEL,
            EMAIL,
            MOBILE,
            ADDRESS,
            EMTITLE,
            EMNAME,
            EMMOBILE,
            EMEMAIL
        } = this.context.dictionary.memberDetails;

        const { GENERALDATA, CONTACTDETAILS } = this.context.dictionary.personalPageContainers;
        const { DATE, GENDERFORMAT, FEMALE, MALE, OTHER } = this.context.dictionary.personalPagePlaceholders;
        const GENDERVALUE = this.context.dictionary.personalPagePlaceholders[gender.toUpperCase()]; // LUT - Look up table
        const { alert } = this.context.dictionary;
        return (
            <div>
                { showAlert
                    ? <Alert
                        alertClose={this.closeAlert}
                        alertMsg={alert[alertMessage]}
                        alertType={alertType}
                    />
                    : null
                }
                <FormContainer formTitle={GENERALDATA} mb-4>
                    <React.Fragment>
                        <InputAvatar
                            profileImgURL={profileImgURL}
                            updateProfileImg={this.updateProfileImg}
                        />
                        <Row>
                            <InputDisplay
                                inputTitle={FIRSTNAME}
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
                                inputTitle={LASTNAME}
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
                                inputTitle={SPIRITUALNAME}
                                inputValue={spiritualName}
                                validation={spiritualNameValidationRule}
                                inputId="spiritualName"
                                inputValueSave={this.handleItemSave}
                                inputVisible={spiritualNameVisible}
                                inputVisibility={this.handleItemVisibility}
                                inputType="text"
                                toDisable={ new Set(['visibility']) }
                                format="Flower Power"
                            />
                            <InputDisplay
                                inputTitle={DATEOFBIRTH}
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
                                format={DATE}
                            />
                        </Row>
                        <Row>
                            <InputDisplay
                                inputTitle={GENDER}
                                inputValue={GENDERVALUE}
                                inputId="gender"
                                inputValueSave={this.handleItemSave}
                                inputVisible={genderVisible}
                                inputVisibility={this.handleItemVisibility}
                                inputFieldAs="select"
                                // empty string - if one does not want to indicate gender
                                optionsForSelect={['', 'Female', 'Male', 'Other']}
                                textForSelect={['', FEMALE, MALE, OTHER]}
                                format={GENDERFORMAT}
                            />
                            <InputDisplay
                                inputTitle={LEVEL}
                                inputValue={level || '-'}
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
                <FormContainer formTitle={CONTACTDETAILS}>
                    <React.Fragment>
                        <Row>
                            <InputDisplay
                                inputTitle={EMAIL}
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
                                inputTitle={MOBILE}
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
                                inputTitle={ADDRESS}
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
                                dropdownTitle={EMTITLE}
                                dropdownId="emContact"
                                inputArray={[
                                    { inputTitle: EMNAME, inputValue: emName, inputId: 'emName', inputType: 'text', validation: nameValidationRule, format: 'Maria Doe' },
                                    { inputTitle: EMMOBILE, inputValue: emMobile, inputId: 'emMobile', inputType: 'mobile', validation: { pattern: mobilePattern }, format: '70/44-66-052' },
                                    { inputTitle: EMEMAIL, inputValue: emEmail, inputId: 'emEmail', inputType: 'text', format: 'maria.doe@gmail.com' }
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
            </div>
        );
    };
}

Personal.contextType = UIcontext;
export default Personal;
