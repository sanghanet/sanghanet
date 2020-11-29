import React, { useContext, useState, useEffect } from 'react';

import { nameValidationRule, spiritualNameValidationRule, addressPattern, mobilePattern } from '../../components/ValidationRule';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import { Row } from 'react-bootstrap';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import { DataContext } from '../../components/contexts/DataContext/DataContext';

const Personal = (props) => {
    const { dictionary } = useContext(UIcontext);
    const { setUsername, setAvatarSrc } = useContext(DataContext);

    const [openDetails, setOpenDetails] = useState(false);

    const [profileImgURL, setProfileImgURL] = useState('');
    const [firstName, setFirstName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [firstNameVisible, setFirstNameVisible] = useState(true);
    const [lastName, setLastName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [lastNameVisible, setLastNameVisible] = useState(true);
    const [spiritualName, setSpiritualName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [spiritualNameVisible, setSpiritualNameVisible] = useState(true);
    const [birthday, setBirthday] = useState('');
    const [birthdayVisible, setBirthdayVisible] = useState(false);
    const [gender, setGender] = useState('');
    const [genderVisible, setGenderVisible] = useState(false);
    const [level, setLevel] = useState('');
    const [levelVisible, setLevelVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVisible, setEmailVisible] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileVisible, setMobileVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [addressVisible, setAddressVisible] = useState(false);
    const [emName, setEmName] = useState('');
    const [emMobile, setEmMobile] = useState('');
    const [emEmail, setEmEmail] = useState('');
    const [emContactVisible, setEmContactVisible] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const displayAlert = (visible, msg, type) => {
        setShowAlert(visible);
        setAlertMessage(msg);
        setAlertType(type);
    };

    const closeAlert = () => { displayAlert(false, '', ''); };

    // componentDidMount
    useEffect(() => {
        Client.fetch('/user/personal')
            .then((data) => {
                setFirstName(data[0].firstName);
                setLastName(data[0].lastName);
                setProfileImgURL(data[0].profileImg);
                setSpiritualName(data[0].spiritualName);
                setBirthday(data[0].birthday);
                setBirthdayVisible(data[0].birthdayVisible);
                setGender(data[0].gender);
                setGenderVisible(data[0].genderVisible);
                setEmail(data[0].email);
                setEmailVisible(data[0].emailVisible);
                setMobile(data[0].mobile);
                setMobileVisible(data[0].mobileVisible);
                setLevel(data[1].level);
                setLevelVisible(data[0].levelVisible);
                setAddress(data[0].address);
                setAddressVisible(data[0].addressVisible);
                setEmName(data[0].emName);
                setEmMobile(data[0].emMobile);
                setEmEmail(data[0].emEmail);
                setEmContactVisible(data[0].emContactVisible);
            }).catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    });

    const toggleDetails = () => {
        setOpenDetails(!openDetails);
    };

    const updateItem = (data) => {
        switch (Object.keys(data)[0]) {
            case 'firstName':
                setFirstName(data.firstName);
                setUsername(data.firstName, lastName);
                break;
            case 'lastName':
                setLastName(data.lastName);
                setUsername(firstName, data.lastName);
                break;
            case 'spiritualName': setSpiritualName(data.spiritualName); break;
            case 'birthday': setBirthday(data.birthday); break;
            case 'birthdayVisible': setBirthdayVisible(data.birthdayVisible); break;
            case 'gender': setGender(data.gender); break;
            case 'genderVisible': setGenderVisible(data.genderVisible); break;
            case 'level': setLevel(data.level); break;
            case 'levelVisible': setLevelVisible(data.levelVisible); break;
            case 'email': setEmail(data.email); break;
            case 'emailVisible': setEmailVisible(data.emailVisible); break;
            case 'mobile': setMobile(data.mobile); break;
            case 'mobileVisible': setMobileVisible(data.mobileVisible); break;
            case 'address': setAddress(data.address); break;
            case 'addressVisible': setAddressVisible(data.addressVisible); break;
            case 'emName': setEmName(data.emName); break;
            case 'emMobile': setEmMobile(data.emMobile); break;
            case 'emEmail': setEmEmail(data.emEmail); break;
            case 'emContactVisible': setEmContactVisible(data.emContactVisible); break;
            default:
                displayAlert(true, 'UNKNOWN_FIELD', 'ERROR');
                return;
        };

        displayAlert(true, 'SAVEDSUCCESSFULLY', 'INFO');
    };

    const handleItemSave = (newValue, id) => {
        Client.fetch('/user/saveitem', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `{"${id}": "${newValue}"}`
        })
            .then((data) => {
                updateItem(data);
            }).catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    };

    const handleItemVisibility = (id) => {
        let itemValue = null;
        const itemKey = `${id}Visible`;
        switch (itemKey) {
            case 'birthdayVisible': itemValue = birthdayVisible; break;
            case 'genderVisible': itemValue = genderVisible; break;
            case 'levelVisible': itemValue = levelVisible; break;
            case 'emailVisible': itemValue = emailVisible; break;
            case 'mobileVisible': itemValue = mobileVisible; break;
            case 'addressVisible': itemValue = addressVisible; break;
            case 'emContactVisible': itemValue = emContactVisible; break;
            default:
                displayAlert(true, 'UNKNOWN_FIELD', 'ERROR');
                return;
        };
        Client.fetch('/user/savevisibility', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: `{"${itemKey}": "${!itemValue}"}`
        })
            .then((data) => {
                updateItem(data);
            }).catch((err) => {
                displayAlert(true, err.message, 'ERROR');
            });
    };

    const updateProfileImg = (event) => {
        const imageToUpload = event.target.files[0];
        if (!imageToUpload) return;
        if (!imageToUpload.name.match(/\.(|jpg|jpeg|png|svg|webp)$/i)) {
            displayAlert(true, 'VALIDPHOTO', 'ERROR');
            return false;
        }
        if (imageToUpload.size < 1048576) { // 1048576 = 1 MB 1024*1024 byte
            const formData = new FormData();
            formData.append('file', imageToUpload);

            Client.fetch('/user/uploadprofileimg', { method: 'POST', body: formData }, true) // skipDefault Headers
                .then((data) => {
                    setAvatarSrc(data.profileImg);
                    setProfileImgURL(data.profileImg);
                }).catch((err) => {
                    displayAlert(true, err.message, 'ERROR');
                });
        } else {
            displayAlert(true, 'PHOTOSIZE', 'ERROR');
        }
    };

    const {
        FIRSTNAME,
        LASTNAME,
        SPIRITUALNAME,
        DATEOFBIRTH,
        GENDER,
        LEVELOFSTUDY,
        EMAIL,
        MOBILE,
        ADDRESS,
        EMTITLE,
        EMNAME,
        EMMOBILE,
        EMEMAIL
    } = dictionary.memberDetails;

    const { GENERALDATA, CONTACTDETAILS } = dictionary.personalPageContainers;
    const { DATE, GENDERFORMAT, FEMALE, MALE, OTHER } = dictionary.personalPagePlaceholders;
    const GENDERVALUE = dictionary.personalPagePlaceholders[gender.toUpperCase()]; // LUT - Look up table
    const LEVELVALUE = dictionary.generalTermsDictionary[level.toUpperCase()];
    const { alert } = dictionary;

    return (
        <div>
            { showAlert &&
                <Alert
                    alertClose={closeAlert}
                    alertMsg={alert[alertMessage]}
                    alertType={alertType}
                />
            }
            <FormContainer formTitle={GENERALDATA} mb-4>
                <React.Fragment>
                    <InputAvatar
                        profileImgURL={profileImgURL}
                        updateProfileImg={updateProfileImg}
                    />
                    <Row>
                        <InputDisplay
                            inputTitle={FIRSTNAME}
                            inputValue={firstName}
                            validation={nameValidationRule}
                            // inputId value should be the same as inputValue value
                            inputId="firstName"
                            inputValueSave={handleItemSave}
                            inputVisible={firstNameVisible}
                            inputVisibility={handleItemVisibility}
                            inputType="text"
                            toDisable={ new Set(['visibility']) }
                            format="Maria-Luiza"
                        />
                        <InputDisplay
                            inputTitle={LASTNAME}
                            inputValue={lastName}
                            validation={nameValidationRule}
                            inputId="lastName"
                            inputValueSave={handleItemSave}
                            inputVisible={lastNameVisible}
                            inputVisibility={handleItemVisibility}
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
                            inputValueSave={handleItemSave}
                            inputVisible={spiritualNameVisible}
                            inputVisibility={handleItemVisibility}
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
                            inputValueSave={handleItemSave}
                            inputVisible={birthdayVisible}
                            inputVisibility={handleItemVisibility}
                            inputType="date"
                            format={DATE}
                        />
                    </Row>
                    <Row>
                        <InputDisplay
                            inputTitle={GENDER}
                            inputValue={GENDERVALUE}
                            inputId="gender"
                            inputValueSave={handleItemSave}
                            inputVisible={genderVisible}
                            inputVisibility={handleItemVisibility}
                            inputFieldAs="select"
                            // empty string - if one does not want to indicate gender
                            optionsForSelect={['', 'Female', 'Male', 'Other']}
                            textForSelect={['', FEMALE, MALE, OTHER]}
                            format={GENDERFORMAT}
                        />
                        <InputDisplay
                            inputTitle={LEVELOFSTUDY}
                            inputValue={LEVELVALUE || '-'}
                            inputId="level"
                            inputVisible={levelVisible}
                            inputVisibility={handleItemVisibility}
                            toDisable={ new Set(['edit']) }
                            // this input is not editable by the user
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
                            inputVisibility={handleItemVisibility}
                            toDisable={ new Set(['edit']) }
                            // since field is non-editable below props are meaningless
                            // inputValueSave={handleItemSave}
                            // inputType="email"
                        />
                        <InputDisplay
                            inputTitle={MOBILE}
                            inputValue={mobile}
                            validation={{
                                pattern: mobilePattern
                            }}
                            inputId="mobile"
                            inputValueSave={handleItemSave}
                            inputVisible={mobileVisible}
                            inputVisibility={handleItemVisibility}
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
                            inputValueSave={handleItemSave}
                            inputVisible={addressVisible}
                            inputVisibility={handleItemVisibility}
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
                            inputValueSave={handleItemSave}
                            dropdownVisible={emContactVisible}
                            dropdownVisibility={handleItemVisibility}
                            dropdownArrow={openDetails}
                            toggleDropdown={toggleDetails}
                        />
                    </Row>
                </React.Fragment>
            </FormContainer>
        </div>
    );
};

export default Personal;
