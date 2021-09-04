class Navbar {
    get mainMenu(): WebdriverIO.Element {
        return $('#hamburger > div > ul.main-menu');
    }

    private navLink(value: string): WebdriverIO.Element {
        return browser.react$('NavLink', {
            props: { to: value },
        });
    }

    get dashboard(): WebdriverIO.Element {
        return this.navLink('/app/dashboard');
    }

    get personal(): WebdriverIO.Element {
        return this.navLink('/app/personal');
    }

    get yoga(): WebdriverIO.Element {
        return this.navLink('/app/yoga');
    }

    get finances(): WebdriverIO.Element {
        return this.navLink('/app/finances');
    }

    get events(): WebdriverIO.Element {
        return this.navLink('/app/events');
    }

    get members(): WebdriverIO.Element {
        return this.navLink('/app/members');
    }

    get questions(): WebdriverIO.Element {
        return this.navLink('/app/questions');
    }

    get queries(): WebdriverIO.Element {
        return this.navLink('/app/queries');
    }

    get logout(): WebdriverIO.Element {
        return $("//*[@id='logout-li']/button");
    }

    clickMenuItem(item: WebdriverIO.Element): void {
        item.waitForClickable({ timeout: 5000 });
        item.click();
    }

    clickDashboardMenuItem(): void {
        this.clickMenuItem(this.dashboard);
    }

    clickPersonalMenuItem(): void {
        this.clickMenuItem(this.personal);
    }

    clickYogaMenuItem(): void {
        this.clickMenuItem(this.yoga);
    }

    clickFinancesMenuItem(): void {
        this.clickMenuItem(this.finances);
    }

    clickEventsMenuItem(): void {
        this.clickMenuItem(this.events);
    }

    clickMembersMenuItem(): void {
        this.clickMenuItem(this.members);
    }

    clickQuestionsMenuItem(): void {
        this.clickMenuItem(this.questions);
    }

    clickQueriesMenuItem(): void {
        this.clickMenuItem(this.queries);
    }

    clickLogoutButton(): void {
        this.clickMenuItem(this.logout);
    }

    waitForFrontPageLoaded(): boolean {
        return this.mainMenu.waitForExist();
    }
}

export default new Navbar();
