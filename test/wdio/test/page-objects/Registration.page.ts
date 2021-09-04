import BasePersonalInfo from './BasePersonalInfo';

class RegistrationPage extends BasePersonalInfo {
    get leaveButton() {
        return $('//*[@id="root"]/div/div/div[1]/form/div[2]/button[1]');
    }

    get registrationButton() {
        return $('//*[@id="root"]/div/div/div[1]/form/div[2]/button[2]');
    }

    get firstNameError() {
        return $('#firstName + .error');
    }

    get lastNameError() {
        return $('#lastName + .error');
    }

    get spiritualNameError() {
        return $('#spiritualName + .error');
    }

    clickLeaveButton(): void {
        this.leaveButton.click();
    }

    clickRegistrationButton(): void {
        this.registrationButton.click();
    }

    isFirstNameErrorExisting() {
        return this.firstNameError.waitForDisplayed({ timeout: 10000 });
    }

    isLastNameErrorExisting() {
        return this.lastNameError.waitForDisplayed({ timeout: 10000 });
    }

    isSpiritualNameErrorExisting() {
        return this.spiritualNameError.waitForDisplayed({ timeout: 10000 });
    }
}

export default new RegistrationPage();
