enum Side {
    Left = 'left',
    Right = 'right',
}

class Footer {
    get footer(): WebdriverIO.Element {
        return $('footer');
    }

    get languageSelector(): WebdriverIO.Element {
        return this.footer.$('.language-selector');
    }

    isLanguageEnglish(): boolean {
        return this.languageSliderSide == 'right';
    }

    get languageSliderSide(): string {
        const sliderClasses = this.languageSelector.$('.lang-slider').getAttribute('class');
        return sliderClasses.split(' ')[1];
    }

    toggleLanguageSlider(): void {
        this.languageSelector.click();
    }

    private setLanguageSliderSide(side: Side) {
        this.languageSliderSide == side || this.toggleLanguageSlider();
    }

    setLanguageToEnglish(): void {
        this.setLanguageSliderSide(Side.Right);
    }

    setLanguageToHungarian(): void {
        this.setLanguageSliderSide(Side.Left);
    }
}

export default new Footer();
