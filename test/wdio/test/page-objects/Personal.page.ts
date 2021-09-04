import BasePersonalInfo from './BasePersonalInfo';

const editButtonSelector = '.edit-button';
const visibilityButtonSelector = '.visible-button';
const valueSelector = '.display-input .display-title';
const labelSelector = '.display-label .display-title';

const firstName = 'firstName';
const lastName = 'lastName';
const spiritualName = 'spiritualName';
const birthday = 'birthday';
const gender = 'gender';
const levelOfStudy = 'level';
const email = 'email';
const mobile = 'mobile';
const address = 'address';
const emergencySection = 'emContact';
const emName = 'emName';
const emNamePosition = 1;
const emMobile = 'emMobile';
const emMobilePosition = 2;
const emEmail = 'emEmail';
const emEmailPosition = 3;

const ESC = 'Escape';

class PersonalPage extends BasePersonalInfo {
    //display-lable, display-input, display-title, visible-button, edit-button,
    waitForLoaded(): boolean {
        return this.emergencySectionComponent.waitForExist({ timeout: 10000 });
    }

    private inputDisplayComponent(inputId: string): WebdriverIO.Element {
        return browser.react$('InputDisplay', { props: { inputId } });
    }

    private labelValue(inputId: string): string {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const label = inputDisplayComponent.$(labelSelector).getText();
        return label;
    }

    private inputValue(inputId: string): string {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const value = inputDisplayComponent.$(valueSelector).getText();
        return value;
    }

    private waitForButtonThenClick(button: WebdriverIO.Element): void {
        button.waitForClickable();
        button.click();
    }

    private clickEditButton(inputId: string): void {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const editButton = inputDisplayComponent.$(editButtonSelector);
        this.waitForButtonThenClick(editButton);
    }

    private toggleVisibilityButton(inputId: string): void {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const visibleButton = inputDisplayComponent.$(visibilityButtonSelector);
        this.waitForButtonThenClick(visibleButton);
    }

    private isEditButtonDisabled(inputId: string) {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const editButton = inputDisplayComponent.$(editButtonSelector);
        editButton.waitForDisplayed();
        return editButton.waitForClickable({ reverse: true });
    }

    private isVisibilityButtonDisabled(inputId: string) {
        const inputDisplayComponent = this.inputDisplayComponent(inputId);
        inputDisplayComponent.waitForExist();
        const visibilityButton = inputDisplayComponent.$(visibilityButtonSelector);
        return visibilityButton.waitForClickable({ reverse: true });
    }

    get firstNameValue(): string {
        return this.inputValue(firstName);
    }

    clickEditFirstNameButton(): void {
        this.clickEditButton(firstName);
    }

    changeFirstNameTo(firstName: string): void {
        this.clickEditFirstNameButton();
        this.enterFirstName(firstName);
        this.clickSaveEditorButton();
    }

    isFirstNameVisibilityButtonDisabled() {
        return this.isVisibilityButtonDisabled(firstName);
    }

    get lastNameValue(): string {
        return this.inputValue(lastName);
    }

    clickEditLastNameButton(): void {
        this.clickEditButton(lastName);
    }

    changeLastNameTo(lastName: string): void {
        this.clickEditLastNameButton();
        this.enterLastName(lastName);
        this.clickSaveEditorButton();
    }

    isLastNameVisibilityButtonDisabled() {
        return this.isVisibilityButtonDisabled(lastName);
    }

    get spiritualNameValue(): string {
        return this.inputValue(spiritualName);
    }

    clickEditSpiritualNameButton(): void {
        this.clickEditButton(spiritualName);
    }

    changeSpiritualNameTo(spiritualName: string): void {
        this.clickEditSpiritualNameButton();
        this.enterSpiritualName(spiritualName);
        this.clickSaveEditorButton();
    }

    isSpiritualNameVisibilityButtonDisabled() {
        return this.isVisibilityButtonDisabled(spiritualName);
    }

    get dateOfBirthValue(): string {
        return this.inputValue(birthday);
    }

    toggleDateOfBirthVisibilityButton(): void {
        this.toggleVisibilityButton(birthday);
    }

    clickEditDateOfBirthButton(): void {
        this.clickEditButton(birthday);
    }

    enterDateOfBirth(date: string): void {
        browser.keys(Array.from(date));
    }

    changeDateOfBirthTo(date: string): void {
        this.clickEditDateOfBirthButton();
        this.enterDateOfBirth(date);
        this.clickSaveEditorButton();
    }

    get genderValue(): string {
        return this.inputValue(gender);
    }

    clickEditGenderButton(): void {
        this.clickEditButton(gender);
    }

    toggleGenderVisibilityButton(): void {
        this.toggleVisibilityButton(gender);
    }

    clickGenderOptionsList(): void {
        const list = $('//*[@id="gender"]');
        this.waitForButtonThenClick(list);
    }

    chooseOptionAtListItem(place: number): void {
        let array = new Array(place);
        array = array.fill('ArrowDown');
        browser.keys(array);
        browser.keys('Enter');
    }

    changeGenderToOptionAtListItem(place: number) {
        this.clickEditGenderButton();
        this.clickGenderOptionsList();
        this.chooseOptionAtListItem(place);
        this.clickSaveEditorButton();
    }

    get levelOfStudyValue(): string {
        return this.inputValue(levelOfStudy);
    }

    toggleLevelOfStudyVisibilityButton(): void {
        this.toggleVisibilityButton(levelOfStudy);
    }

    isEditLevelOfStudyButtonDisabled(): boolean {
        return this.isEditButtonDisabled(levelOfStudy);
    }

    get emailValue(): string {
        return this.inputValue(email);
    }

    toggleEmailVisibilityButton(): void {
        this.toggleVisibilityButton(email);
    }

    isEditEmailButtonDisabled(): boolean {
        return this.isEditButtonDisabled(email);
    }

    get mobileValue(): string {
        return this.inputValue(mobile);
    }

    toggleMobileVisibilityButton(): void {
        this.toggleVisibilityButton(mobile);
    }

    clickEditMobileButton(): void {
        this.clickEditButton(mobile);
    }

    get mobileInput(): WebdriverIO.Element {
        return this.getInputFieldByInputId(mobile);
    }

    enterMobile(mobile: string): void {
        this.mobileInput.setValue(mobile);
    }

    changeMobileTo(mobile: string): void {
        this.clickEditMobileButton();
        this.enterMobile(mobile);
        this.clickSaveEditorButton();
    }

    get addressValue(): string {
        return this.inputValue(address);
    }

    toggleAddressVisibilityButton(): void {
        this.toggleVisibilityButton(address);
    }

    clickEditAddressButton(): void {
        this.clickEditButton(address);
    }

    get addressInput(): WebdriverIO.Element {
        return this.getInputFieldByInputId(address);
    }

    enterAddress(address: string): void {
        this.addressInput.setValue(address);
    }

    changeAddressTo(address: string): void {
        this.clickEditAddressButton();
        this.enterAddress(address);
        this.clickSaveEditorButton();
    }

    private get emergencySectionComponent(): WebdriverIO.Element {
        return browser.react$('InputDropdown', { props: { dropdownId: emergencySection } });
    }

    toggleEmergencySection(): void {
        const emergencySectionComponent = this.emergencySectionComponent;
        emergencySectionComponent.waitForDisplayed();
        const button = emergencySectionComponent.$('button:nth-child(1)');
        this.waitForButtonThenClick(button);
    }

    toggleEmergencySectionVisibility(): void {
        const emergencySectionComponent = this.emergencySectionComponent;
        emergencySectionComponent.waitForDisplayed();
        const visibleButton = emergencySectionComponent.$(visibilityButtonSelector);
        this.waitForButtonThenClick(visibleButton);
    }

    isEmergencySectionVisible(): boolean {
        return this.emergencyEmailDisplayField.waitForDisplayed();
    }

    isEmergencySectionClosed(): boolean {
        return this.emergencyEmailDisplayField.waitForDisplayed({ reverse: true });
    }

    private getEmergencySectionComponentNthChild(n: number): WebdriverIO.Element {
        const emergencySectionComponent = this.emergencySectionComponent;
        emergencySectionComponent.waitForDisplayed();
        const child = emergencySectionComponent.$(`.card-body:nth-child(${n})`);
        return child;
    }

    private getEmergencySectionComponentNthChildValue(n: number): string {
        const node = this.getEmergencySectionComponentNthChild(n);
        return node.$('.display-title').getText();
    }

    private clickEditEmergencyNthChild(n: number): void {
        const child = this.getEmergencySectionComponentNthChild(n);
        const editButton = child.$('.edit-button');
        this.waitForButtonThenClick(editButton);
    }

    private enterEmValue(value: string, inputId: string): void {
        const inputField = $(`//*[@id="${inputId}"]`);
        inputField.waitForExist();
        inputField.setValue(value);
    }

    private changeEmValueTo(n: number, value: string, inputId: string): void {
        this.isEmergencySectionVisible();
        this.clickEditEmergencyNthChild(n);
        this.enterEmValue(value, inputId);
        this.clickSaveEditorButton();
    }

    get emergencyEmailDisplayField(): WebdriverIO.Element {
        return this.getEmergencySectionComponentNthChild(emEmailPosition);
    }

    get emergencyName(): string {
        return this.getEmergencySectionComponentNthChildValue(emNamePosition);
    }

    clickEditEmergencyName(): void {
        this.clickEditEmergencyNthChild(emNamePosition);
    }

    enterEmName(name: string): void {
        this.enterEmValue(name, emName);
    }

    changeEmNameTo(name: string): void {
        this.changeEmValueTo(emNamePosition, name, emName);
    }

    get emergencyMobile(): string {
        return this.getEmergencySectionComponentNthChildValue(emMobilePosition);
    }

    clickEditEmergencyMobile(): void {
        this.clickEditEmergencyNthChild(emMobilePosition);
    }

    enterEmMobile(mobile: string): void {
        this.enterEmValue(mobile, emMobile);
    }

    changeEmMobileTo(mobile: string): void {
        this.changeEmValueTo(emMobilePosition, mobile, emMobile);
    }

    get emergencyEmail(): string {
        return this.getEmergencySectionComponentNthChildValue(emEmailPosition);
    }

    clickEditEmergencyEmail(): void {
        this.clickEditEmergencyNthChild(emEmailPosition);
    }

    enterEmEmail(email: string): void {
        this.enterEmValue(email, emEmail);
    }

    changeEmEmailTo(email: string): void {
        this.changeEmValueTo(emEmailPosition, email, emEmail);
    }

    get saveEditorButton(): WebdriverIO.Element {
        return $('/html/body/div[3]/div/div/form/div[3]/button[2]');
    }

    isEditorVisible(): boolean {
        browser.pause(1000);
        return this.saveEditorButton.waitForExist();
    }

    isEditorClosed(): boolean {
        browser.pause(1000);
        return this.saveEditorButton.waitForExist({ reverse: true });
    }

    clickSaveEditorButton(): void {
        const button = this.saveEditorButton;
        this.waitForButtonThenClick(button);
    }

    clickCloseEditorButton(): void {
        const button = $('/html/body/div[3]/div/div/form/div[3]/button[1]');
        this.waitForButtonThenClick(button);
    }

    clickEscapeEditorButton(): void {
        const button = $('/html/body/div[3]/div/div/form/div[1]/button');
        this.waitForButtonThenClick(button);
    }

    pressEscapeButton(): void {
        browser.keys(ESC);
    }
}

export default new PersonalPage();
