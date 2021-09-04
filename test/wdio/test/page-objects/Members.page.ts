class Members {
    private SPIRITUAL_NAME = 'Spiritual Name';
    private DATE_OF_BIRTH = 'Date of Birth';
    private GENDER = 'Gender';
    private EMAIL = 'Email';
    private MOBILE = 'Mobile';
    private ADDRESS = 'Address';
    private EMERGENCY_CONTACT_NAME = 'Emergency Contact Name';
    private EMERGENCY_CONTACT_MOBILE = 'Emergency Contact Mobile';
    private EMERGENCY_CONTACT_EMAIL = 'Emergency Contact Email';

    get activeMemberCard(): WebdriverIO.Element {
        return $('ul.card-container > li.member-card.active-member');
    }

    get activeMemberName(): string {
        const activeMember = this.activeMemberCard;
        const activeMemberNameElement = activeMember.$('.card-name');
        return activeMemberNameElement.getText();
    }

    get activeMemberSpiritualName(): string {
        const activeMember = this.activeMemberCard;
        const activeMemberSpiritualNameElement = activeMember.$('.card-spiritual-name');
        return activeMemberSpiritualNameElement.getText();
    }

    get seeSharedDataButtonOfActiveMember(): WebdriverIO.Element {
        const activeMember = this.activeMemberCard;
        return activeMember.$('button');
    }

    get memberDataList(): WebdriverIO.ElementArray {
        return $$('.member-data');
    }

    waitForLoaded(): boolean {
        return this.activeMemberCard.waitForExist({ timeout: 10000 });
    }

    getMemberDataValueByDataLabel(dataLabel: string): string {
        const memberDataList = this.memberDataList;
        const requestedMemberData: WebdriverIO.Element | undefined = memberDataList.find(
            (memberData) => !!memberData.$(`=${dataLabel}`)
        );

        if (requestedMemberData) {
            const valueContainer = requestedMemberData.nextElement();
            return valueContainer.$('p.data-value').getText();
        } else {
            return `Error: memberData with ${dataLabel} not found.`;
        }
    }

    clickSeeSharedDataButton() {
        const seeSharedDateButton = this.seeSharedDataButtonOfActiveMember;
        seeSharedDateButton.waitForClickable({ timeout: 10000 });
        seeSharedDateButton.click();
    }

    get spiritualName(): string {
        return this.getMemberDataValueByDataLabel(this.SPIRITUAL_NAME);
    }

    get dateOfBirth(): string {
        return this.getMemberDataValueByDataLabel(this.DATE_OF_BIRTH);
    }

    get gender(): string {
        return this.getMemberDataValueByDataLabel(this.GENDER);
    }

    get email(): string {
        return this.getMemberDataValueByDataLabel(this.EMAIL);
    }

    get mobile(): string {
        return this.getMemberDataValueByDataLabel(this.MOBILE);
    }

    get address(): string {
        return this.getMemberDataValueByDataLabel(this.ADDRESS);
    }

    get emergencyContactName(): string {
        return this.getMemberDataValueByDataLabel(this.EMERGENCY_CONTACT_NAME);
    }

    get emergencyContactMobile(): string {
        return this.getMemberDataValueByDataLabel(this.EMERGENCY_CONTACT_MOBILE);
    }

    get emergencyContactEmail(): string {
        return this.getMemberDataValueByDataLabel(this.EMERGENCY_CONTACT_EMAIL);
    }
}

export default new Members();
