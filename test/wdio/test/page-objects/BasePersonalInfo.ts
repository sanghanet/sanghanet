class BasePersonalInfo {
    protected getInputFieldByInputId(inputId: string): WebdriverIO.Element {
        return $(`//input[@id="${inputId}']`);
    }

    get avatarInput(): WebdriverIO.Element {
        return $('//input[@id="file"]');
    }

    get firstNameInput(): WebdriverIO.Element {
        return $('//input[@id="firstName"]');
    }

    get lastNameInput(): WebdriverIO.Element {
        return $('//input[@id="lastName"]');
    }

    get spiritualNameInput(): WebdriverIO.Element {
        return $('//input[@id="spiritualName"]');
    }

    get alert(): WebdriverIO.Element {
        return $('[role=alert]');
    }

    get closeAlertButton(): WebdriverIO.Element {
        return $('button.close');
    }

    closeAlert(): void {
        this.closeAlertButton.click();
    }

    enterFirstName(firstName: string): void {
        this.firstNameInput.setValue(firstName);
    }

    enterLastName(lastName: string): void {
        this.lastNameInput.setValue(lastName);
    }

    enterSpiritualName(spiritualName: string): void {
        this.spiritualNameInput.setValue(spiritualName);
    }

    uploadAvatar(avatarFilePath: string): void {
        const avatarRemoteFilePath = browser.uploadFile(avatarFilePath);
        this.avatarInput.setValue(avatarRemoteFilePath);
    }

    waitForAlertLoaded(): boolean {
        return this.alert.waitForExist({ timeout: 10000 });
    }

    waitForAlertToDisappear(): void {
        this.alert.waitForExist({ timeout: 10000, reverse: true });
    }
}

export default BasePersonalInfo;
