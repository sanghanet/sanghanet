import Navbar from '../components/Navbar';
import Members from '../page-objects/Members.page';
import PersonalPage from '../page-objects/Personal.page';
import RegistrationPage from '../page-objects/Registration.page';
import {
    registratingUser as user,
    registratingUserUnhappyPathDetails as unhappyPath,
} from '../../../common/test-data/test-data';
import { setup, teardown } from '../../../common/helpers/helpers';
import * as steps from '../steps/steps';

const loginParams = {
    gmailAddress: user.member.email,
    password: user.password,
};

describe('The registration process', () => {
    beforeEach(() => {
        browser.call(() => setup(user.member));
        steps.login(loginParams);
    });

    afterEach(() => {
        browser.call(() => teardown(user.member.email));
    });

    describe('Successful registration', () => {
        it('should register the user with valid details', () => {
            const { avatar, firstName, lastName, spiritualName } = user.registrationDetails;

            RegistrationPage.uploadAvatar(avatar);
            RegistrationPage.enterFirstName(firstName);
            RegistrationPage.enterLastName(lastName);
            RegistrationPage.enterSpiritualName(spiritualName);
            RegistrationPage.clickRegistrationButton();

            Navbar.waitForFrontPageLoaded();
            Navbar.clickPersonalMenuItem();
            PersonalPage.waitForLoaded();

            expect(firstName).toEqual(PersonalPage.firstNameValue);
            expect(lastName).toEqual(PersonalPage.lastNameValue);
            expect(spiritualName).toEqual(PersonalPage.spiritualNameValue);
            //TODO - avatarValue expect(avatar).toEqual(PersonalPage.av);

            Navbar.clickMembersMenuItem();
            Members.waitForLoaded();
            Members.clickSeeSharedDataButton();

            expect(Members.activeMemberName).toContain(firstName);
            expect(Members.activeMemberName).toContain(lastName);
            expect(spiritualName).toEqual(Members.activeMemberSpiritualName);
        });
    });

    describe('Registration input validation errors', () => {
        afterEach(() => {
            browser.refresh();
        });
    
        it('should show errorMessage when trying to register with image with size above 1MB', () => {
            steps.fillOutRegistrationForm({
                ...user.registrationDetails,
                avatar: unhappyPath.invalidAvatarSize,
            });
    
            const isAlertCausedByAvatarSizeLimitLoaded = RegistrationPage.waitForAlertLoaded();
    
            expect(isAlertCausedByAvatarSizeLimitLoaded).toBeTrue();
    
            RegistrationPage.closeAlert();
            RegistrationPage.waitForAlertToDisappear();
    
            RegistrationPage.clickRegistrationButton();
            const isAlertCausedByMissingMandatoryFieldLoaded = RegistrationPage.waitForAlertLoaded();
    
            expect(isAlertCausedByMissingMandatoryFieldLoaded).toBeTrue();
        });
    
        it('should show errorMessage when trying to register with image with wrong file extension', () => {
            steps.fillOutRegistrationForm({
                ...user.registrationDetails,
                avatar: unhappyPath.invalidAvatarFormat,
            });
    
            const isAlertCausedByAvatarExtensionLoaded = RegistrationPage.waitForAlertLoaded();
    
            expect(isAlertCausedByAvatarExtensionLoaded).toBeTrue();
    
            RegistrationPage.closeAlert();
            RegistrationPage.waitForAlertToDisappear();
    
            RegistrationPage.clickRegistrationButton();
            const isAlertCausedByMissingMandatoryFieldLoaded = RegistrationPage.waitForAlertLoaded();
    
            expect(isAlertCausedByMissingMandatoryFieldLoaded).toBeTrue();
        });
    
        describe('The application displays errorMessage when some input *name is invalid, like', () => {
            beforeEach(() => {
                steps.fillOutRegistrationForm({
                    ...user.registrationDetails,
                });
            });
    
            it('should display errorMessage, when firstName is invalid', () => {
                RegistrationPage.enterFirstName('#invalid');
    
                expect(RegistrationPage.isFirstNameErrorExisting()).toBeTrue();
            });
    
            it('should display errorMessage, when lastName is invalid', () => {
                RegistrationPage.enterLastName('#invalid');
    
                expect(RegistrationPage.isLastNameErrorExisting()).toBeTrue();
            });
    
            it('should display errorMessage, when spiritualName is invalid', () => {
                RegistrationPage.enterSpiritualName('#invalid');
    
                expect(RegistrationPage.isSpiritualNameErrorExisting()).toBeTrue();
            });
        });
    });
    
});

