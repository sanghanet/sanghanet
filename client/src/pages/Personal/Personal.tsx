import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { nameValidationRule, spiritualNameValidationRule, addressPattern, mobilePattern } from '../../components/ValidationRule';

import FormContainer from '../../components/Form/FormContainer/FormContainer';
import InputDisplay from '../../components/Form/InputDisplay/InputDisplay';
import InputAvatar from '../../components/Form/InputAvatar/InputAvatar';
import InputDropdown from '../../components/Form/InputDropdown/InputDropdown';
import Client from '../../components/Client';
import Alert from '../../components/Alert/Alert';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';
import { DataContext } from '../../components/contexts/DataContext/DataContext';
import Row from 'react-bootstrap/Row';
import { DisableInput } from '../../enums/DisableInput';

const Personal: React.FC<RouteComponentProps> = () => {
    const { dictionary } = useContext(UIcontext);
    const { setUsername, setAvatarSrc } = useContext(DataContext);

    const [openDetails, setOpenDetails] = useState<boolean>(false);

    const [profileImgURL, setProfileImgURL] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [firstNameVisible, setFirstNameVisible] = useState<boolean>(true);
    const [lastName, setLastName] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [lastNameVisible, setLastNameVisible] = useState<boolean>(true);
    const [spiritualName, setSpiritualName] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [spiritualNameVisible, setSpiritualNameVisible] = useState<boolean>(true);
    const [birthday, setBirthday] = useState<string>('');
    const [birthdayVisible, setBirthdayVisible] = useState<boolean>(false);
    const [gender, setGender] = useState<string>('');
    const [genderVisible, setGenderVisible] = useState<boolean>(false);
    const [level, setLevel] = useState<string>('');
    const [levelVisible, setLevelVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [emailVisible, setEmailVisible] = useState<boolean>(false);
    const [mobile, setMobile] = useState<string>('');
    const [mobileVisible, setMobileVisible] = useState<boolean>(false);
    const [address, setAddress] = useState<string>('');
    const [addressVisible, setAddressVisible] = useState<boolean>(false);
    const [emName, setEmName] = useState<string>('');
    const [emMobile, setEmMobile] = useState<string>('');
    const [emEmail, setEmEmail] = useState<string>('');
    const [emContactVisible, setEmContactVisible] = useState<boolean>(false);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertType, setAlertType] = useState<ALERT>('NOALERT');

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

    const { VISIBLE, NOTVISIBLE, SAVEDSUCCESSFULLY } = dictionary.alert;

    const displayAlert = (visible: boolean, msg: string, type: ALERT): void => {
        setShowAlert(visible);
        setAlertMessage(msg);
        setAlertType(type);
    };

    const closeAlert = (): void => { displayAlert(false, '', 'NOALERT'); };

    // componentDidMount
    useEffect(() => {
        Client.fetch('/user/personal')
            .then((data: Array<PersonalDataType>) => {
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
    }, []);

    const toggleDetails = (): void => {
        setOpenDetails(!openDetails);
    };

    const getInfoMessage = (visible: boolean, dataName: string): string => {
        const ending = visible ? VISIBLE : NOTVISIBLE;
        return `${dataName} ${ending}`;
    };

    const updateItem = (data: PersonalDataType): void => {
        switch (Object.keys(data)[0]) {
            case 'firstName':
                setFirstName(data.firstName);
                setUsername(data.firstName, lastName);
                displayAlert(true, FIRSTNAME + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'lastName':
                setLastName(data.lastName);
                setUsername(firstName, data.lastName);
                displayAlert(true, LASTNAME + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'spiritualName':
                setSpiritualName(data.spiritualName);
                displayAlert(true, SPIRITUALNAME + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'birthday':
                setBirthday(data.birthday);
                displayAlert(true, DATEOFBIRTH + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'birthdayVisible':
                setBirthdayVisible(data.birthdayVisible);
                displayAlert(true, getInfoMessage(data.birthdayVisible, DATEOFBIRTH), 'INFO');
                break;
            case 'gender':
                setGender(data.gender);
                displayAlert(true, GENDER + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'genderVisible':
                setGenderVisible(data.genderVisible);
                displayAlert(true, getInfoMessage(data.genderVisible, GENDER), 'INFO');
                break;
            case 'level':
                setLevel(data.level);
                displayAlert(true, LEVELOFSTUDY + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'levelVisible':
                setLevelVisible(data.levelVisible);
                displayAlert(true, getInfoMessage(data.levelVisible, LEVELOFSTUDY), 'INFO');
                break;
            case 'email':
                setEmail(data.email);
                displayAlert(true, EMAIL + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'emailVisible':
                setEmailVisible(data.emailVisible);
                displayAlert(true, getInfoMessage(data.emailVisible, EMAIL), 'INFO');
                break;
            case 'mobile':
                setMobile(data.mobile);
                displayAlert(true, MOBILE + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'mobileVisible':
                setMobileVisible(data.mobileVisible);
                displayAlert(true, getInfoMessage(data.mobileVisible, MOBILE), 'INFO');
                break;
            case 'address':
                setAddress(data.address);
                displayAlert(true, ADDRESS + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'addressVisible':
                setAddressVisible(data.addressVisible);
                displayAlert(true, getInfoMessage(data.addressVisible, ADDRESS), 'INFO');
                break;
            case 'emName':
                setEmName(data.emName);
                displayAlert(true, EMNAME + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'emMobile':
                setEmMobile(data.emMobile);
                displayAlert(true, EMMOBILE + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'emEmail':
                setEmEmail(data.emEmail);
                displayAlert(true, EMEMAIL + ' ' + SAVEDSUCCESSFULLY, 'INFO');
                break;
            case 'emContactVisible':
                setEmContactVisible(data.emContactVisible);
                displayAlert(true, getInfoMessage(data.emContactVisible, EMTITLE), 'INFO');
                break;
            default:
                displayAlert(true, 'UNKNOWN_FIELD', 'ERROR');
                return;
        };
    };

    const handleItemSave = (id: string, newValue: string): void => {
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

    const handleItemVisibility = (id: string): void => {
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

    const updateProfileImg = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files) return;
        const imageToUpload = event.target.files[0];
        if (!imageToUpload) return;
        if (!imageToUpload.name.match(/\.(|jpg|jpeg|png|svg|webp)$/i)) {
            displayAlert(true, 'VALIDPHOTO', 'ERROR');
        }
        if (imageToUpload.size < 1_048_576) { // 1048576 = 1 MB 1024*1024 byte
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

    const { GENERALDATA, CONTACTDETAILS } = dictionary.personalPageContainers;
    const { DATE, GENDERFORMAT, FEMALE, MALE, OTHER } = dictionary.personalPagePlaceholders;
    const GENDERVALUE = dictionary.personalPagePlaceholders[gender.toUpperCase()]; // LUT - Look up table
    const LEVELVALUE = dictionary.generalTermsDictionary[level.toUpperCase()];

    return (
        <div>
            {showAlert &&
                <Alert
                    alertClose={closeAlert}
                    alertMsg={alertMessage}
                    alertType={alertType}
                />}
            <FormContainer formTitle={GENERALDATA} mb-4>
                <>
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
                            toDisable={DisableInput.Visibility}
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
                            toDisable={DisableInput.Visibility}
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
                            toDisable={DisableInput.Visibility}
                            format="Flower Power"
                        />
                        <InputDisplay
                            inputTitle={DATEOFBIRTH}
                            inputValue={birthday}
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
                            // At start gender is '', and dictionary look-up result is undefined
                            inputValue={GENDERVALUE || ''}
                            inputId="gender"
                            inputValueSave={handleItemSave}
                            inputVisible={genderVisible}
                            inputVisibility={handleItemVisibility}
                            inputFieldAsSelect
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
                            toDisable={DisableInput.Edit}
                            // this input is not editable by the user
                            inputValueSave={(id, newValue): void => { /* do nothing */ }}
                        />
                    </Row>
                </>
            </FormContainer>
            <FormContainer formTitle={CONTACTDETAILS}>
                <>
                    <Row>
                        <InputDisplay
                            inputTitle={EMAIL}
                            inputValue={email}
                            inputId="email"
                            inputVisible={emailVisible}
                            inputVisibility={handleItemVisibility}
                            toDisable={DisableInput.Edit}
                            inputValueSave={(id, newValue): void => { /* do nothing */ }}
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
                </>
            </FormContainer>
        </div>
    );
};

export default Personal;
