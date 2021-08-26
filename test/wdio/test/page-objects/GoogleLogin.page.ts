class GoogleLogin {
    get emailInput() {
        return $('input[type=email]');
    }

    get nextButton() {
        return $('#identifierNext > div > button');
    }

    get loginButton() {
        return $('#passwordNext > div > button');
    }

    get passwordInput() {
        return $('input[name=password]');
    }

    get hiddenPassword() {
        return $('[name=hiddenPassword]');
    }

    clickNextButton() {
        this.nextButton.click();
    }
    clickLoginButton() {
        this.loginButton.click();
    }

    enterEmail(emailAddress: string) {
        this.emailInput.setValue(emailAddress);
    }

    enterPassword(password: string) {
        const passwordInput = this.passwordInput;
        passwordInput.waitForDisplayed({ timeout: 10000 });
        passwordInput.setValue(password);
    }

    waitForPasswordFieldLoaded() {
        this.hiddenPassword.waitForExist({ reverse: true });
    }
}

export default new GoogleLogin();
