import Navbar from '../components/Navbar';
import LoginPage from '../page-objects/Login.page';
import GoogleLogin from '../page-objects/GoogleLogin.page';
import { setup, teardown } from '../../../common/helpers/helpers';

const email = 'user.for.sangha.login@gmail.com';
const password = 'RandomPassword123';
const user = ['Teszt Elek', email, false, true, false, false, false, ''];

describe('Something will happen', () => {
    beforeAll(() => setup(user));

    afterAll(() => teardown(email));

    it('Should login', () => {
        browser.url('http://gmail.com')
        
        GoogleLogin.enterEmail(email);

        GoogleLogin.clickNextButton();
        GoogleLogin.waitForPasswordFieldLoaded();

        GoogleLogin.enterPassword(password);
        GoogleLogin.clickLoginButton();

        LoginPage.open();
        LoginPage.clickLoginButton();

        GoogleLogin.enterEmail(email);

        GoogleLogin.clickNextButton();
        GoogleLogin.waitForPasswordFieldLoaded();

        GoogleLogin.enterPassword(password);
        GoogleLogin.clickLoginButton();
        browser.debug();

        expect(Navbar.waitForFrontPageLoaded()).toBeTrue();
    });
});
