import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Members from '../page-objects/Members.page';
import PersonalPage from '../page-objects/Personal.page';

import { user2 } from '../../../common/test-data/test-data';
import { setup, teardown } from '../../../common/helpers/helpers';
import * as steps from '../steps/steps';

const password = 'RandomPassword123';
const loginParams = {
    gmailAddress: user2.email,
    password,
};

import { join } from 'path';
const registrationDetails: steps.RegistrationDetails = {
    avatar: join(__dirname, '../../../common/test-data/Aang.png'),
    firstName: 'Teszt',
    lastName: 'Elek Kettő',
    spiritualName: 'Spiritual Name',
};

describe('The application ', () => {
    beforeAll(() => {
        browser.call(() => setup(user2));
        steps.login(loginParams);
        steps.register(registrationDetails);
        Footer.setLanguageToHungarian();
    });

    afterAll(() => {
        browser.call(() => teardown(user2.email));
    });

    // it('should show full name and last name as default visible data', () => {});

    it('should change the editable general data', () => {
        const newFirstName = 'Zen';
        const newLastName = 'Master';
        const newSpiritualName = 'Atlas';

        browser.pause(1000);

        PersonalPage.changeFirstNameTo(newFirstName);
        browser.pause(1000);

        expect(PersonalPage.firstNameValue).toEqual(newFirstName);

        PersonalPage.changeLastNameTo(newLastName);
        browser.pause(1000);

        expect(PersonalPage.lastNameValue).toEqual(newLastName);

        PersonalPage.changeSpiritualNameTo(newSpiritualName);
        browser.pause(1000);

        expect(PersonalPage.spiritualNameValue).toEqual(newSpiritualName);

        PersonalPage.changeDateOfBirthTo('01.31.1990');
        browser.pause(1000);

        expect(PersonalPage.dateOfBirthValue).toEqual('1990-01-31');

        PersonalPage.changeGenderToOptionAtListItem(2);
        browser.pause(1000);

        expect('FérfiMale').toContain(PersonalPage.genderValue);
    });

    describe("filling contact details'", () => {
        it('should change the contact details', () => {
            const mobile = '00/00-00-000';
            const address = 'zen-mom@hunsangha.light'; //TODO

            expect(PersonalPage.isEditEmailButtonDisabled()).toBeTrue();

            PersonalPage.changeMobileTo(mobile);
            browser.pause(1000);

            expect(PersonalPage.mobileValue).toEqual(mobile);
        });

        it('should change the emergency contact details', () => {
            const emName = 'Zen Mom';
            const emMobile = '00/00-00-001';
            const emEmail = 'zen-mom@hunsangha.light';

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
});
