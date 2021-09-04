import Navbar from '../components/Navbar';
import LoginPage from '../page-objects/Login.page';
import GoogleLogin from '../page-objects/GoogleLogin.page';
import RegistrationPage from '../page-objects/Registration.page';

export type LoginParams = {
    gmailAddress: string;
    password: string;
};

export type RegistrationDetails = {
    avatar: string;
    firstName: string;
    lastName: string;
    spiritualName?: string;
};

const testLoginResult = () => {
    const isLoginSuccessful = RegistrationPage.avatarInput.waitForExist({ timeout: 10000 }); //both registrationPage and personalPage have in common
    expect(isLoginSuccessful).toBeTrue();
};

export const login = ({ gmailAddress, password }: LoginParams): void => {
    LoginPage.open();
    LoginPage.clickLoginButton();

    GoogleLogin.enterEmail(gmailAddress);
    GoogleLogin.clickNextButton();

    GoogleLogin.waitForPasswordFieldLoaded();
    GoogleLogin.enterPassword(password);
    GoogleLogin.clickLoginButton();

    testLoginResult();
};

export const fillOutRegistrationForm = ({
    avatar,
    firstName,
    lastName,
    spiritualName,
}: RegistrationDetails): void => {
    RegistrationPage.uploadAvatar(avatar);
    RegistrationPage.enterFirstName(firstName);
    RegistrationPage.enterLastName(lastName);
    spiritualName && RegistrationPage.enterSpiritualName(spiritualName);
};

export const register = ({
    avatar: avatarRelativePath,
    firstName,
    lastName,
    spiritualName,
}: RegistrationDetails): void => {
    fillOutRegistrationForm({ avatar: avatarRelativePath, firstName, lastName, spiritualName });
    RegistrationPage.clickRegistrationButton();
    Navbar.waitForFrontPageLoaded();
};
