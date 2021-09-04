import Navbar from '../components/Navbar';
import Header from '../components/Header';
import PersonalPage from '../page-objects/Personal.page';

import { join } from 'path';

import { user2 } from '../../../common/test-data/test-data';
import { setup, teardown } from '../../../common/helpers/helpers';
import * as steps from '../steps/steps';
import MembersPage from '../page-objects/Members.page';

const newFirstName = 'Zen';
const newLastName = 'Master';
const newSpiritualName = 'Atlas';

const mobile = '00/00-00-000';
const address = '1055 Budapest, Csalogany u. 26 B/12';

const emName = 'Zen Mom';
const emMobile = '00/00-00-001';
const emEmail = 'zen-mom@hunsangha.light';

describe('The application ', () => {
    beforeAll(() => {
        const relativeFilePath = '../../../common/test-data/avatar.JPG';
        const avatarFilePath: string = join(__dirname, relativeFilePath);

        const registrationDetails: steps.RegistrationDetails = {
            avatar: avatarFilePath,
            firstName: 'Teszt',
            lastName: 'Elek',
            spiritualName: 'Spiritual Name',
        };

        const loginParams = {
            gmailAddress: user2.email,
            password: 'newUser1234',
        };

        browser.call(() => setup(user2));
        steps.login(loginParams);
        steps.register(registrationDetails);
    });

    afterAll(() => {
        browser.call(() => teardown(user2.email));
    });

    it('should change firstName', () => {
        PersonalPage.changeFirstNameTo(newFirstName);
        browser.pause(1000);

        expect(PersonalPage.firstNameValue).toEqual(newFirstName);
        expect(Header.avatarName).toContain(newFirstName);
        expect(Header.avatarName).toContain(PersonalPage.lastNameValue);

        Navbar.clickMembersMenuItem();
        MembersPage.waitForLoaded();

        expect(MembersPage.activeMemberName).toContain(newFirstName);
        expect(MembersPage.activeMemberName).toContain(PersonalPage.lastNameValue);
        Navbar.clickPersonalMenuItem();
        PersonalPage.waitForLoaded();
    });

    it('should change lastName', () => {
        PersonalPage.changeLastNameTo(newLastName);
        browser.pause(1000);

        expect(PersonalPage.lastNameValue).toEqual(newLastName);
        expect(Header.avatarName).toContain(newFirstName);
        expect(Header.avatarName).toContain(newLastName);

        Navbar.clickMembersMenuItem();
        MembersPage.waitForLoaded();

        expect(MembersPage.activeMemberName).toContain(newFirstName);
        expect(MembersPage.activeMemberName).toContain(newLastName);
        Navbar.clickPersonalMenuItem();
        PersonalPage.waitForLoaded();
    });

    it('should change spiritualName', () => {
        PersonalPage.changeSpiritualNameTo(newSpiritualName);
        browser.pause(1000);

        expect(PersonalPage.spiritualNameValue).toEqual(newSpiritualName);

        Navbar.clickMembersMenuItem();
        MembersPage.waitForLoaded();

        expect(MembersPage.activeMemberSpiritualName).toEqual(newSpiritualName);
        Navbar.clickPersonalMenuItem();
        PersonalPage.waitForLoaded();
    });

    /*
    it('should change dateOfBirth', () => {
        //   PersonalPage.changeDateOfBirthTo("01.31.1990");
        //   browser.pause(1000);
        //   expect(PersonalPage.dateOfBirthValue).toEqual("1990-01-31");
    });
    */

    it('should change gender', () => {
        PersonalPage.changeGenderToOptionAtListItem(2);
        browser.pause(1000);

        expect('FérfiMale').toContain(PersonalPage.genderValue);
    });

    it('should show levelOfStudy edit button as disabled', () => {
        expect(PersonalPage.isEditLevelOfStudyButtonDisabled).toBeTrue();
    });

    describe("filling contact details'", () => {
        it('should show email edit button as disabled', () => {
            expect(PersonalPage.isEditEmailButtonDisabled()).toBeTrue();
        });

        it('should change user`s mobile', () => {
            PersonalPage.changeMobileTo(mobile);
            browser.pause(1000);

            expect(PersonalPage.mobileValue).toEqual(mobile);

            PersonalPage.changeAddressTo(address);

            expect(PersonalPage.addressValue).toEqual(address);
        });

        it('should change user`s address', () => {
            PersonalPage.changeAddressTo(address);

            expect(PersonalPage.addressValue).toEqual(address);
        });

        it('should change the emergency contact details', () => {
            PersonalPage.toggleEmergencySection();

            PersonalPage.changeEmNameTo(emName);
            browser.pause(1000);

            expect(PersonalPage.emergencyName).toEqual(emName);

            PersonalPage.changeEmMobileTo(emMobile);
            browser.pause(1000);

            expect(PersonalPage.emergencyMobile).toEqual(emMobile);

            PersonalPage.changeEmEmailTo(emEmail);
            browser.pause(1000);

            expect(PersonalPage.emergencyEmail).toEqual(emEmail);

            browser.pause(20000);
        });
    });

    describe('changing visibility settings', () => {
        beforeEach(() => {
            Navbar.clickPersonalMenuItem();
        });

        it('should not allow to change first/last/spiritual name visibility', () => {
            expect(PersonalPage.isFirstNameVisibilityButtonDisabled()).toBeTrue();
            expect(PersonalPage.isLastNameVisibilityButtonDisabled()).toBeTrue();
            expect(PersonalPage.isSpiritualNameVisibilityButtonDisabled()).toBeTrue();
        });

        /*
        it('should make gender to be visible', () => {
            PersonalPage.toggleGenderVisibilityButton();
            Navbar.clickMembersMenuItem();
            MembersPage.waitForLoaded();
        });
        */
    });
});
