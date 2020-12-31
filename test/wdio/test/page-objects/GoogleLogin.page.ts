class GoogleLogin {
   get emailInputField() {
      return $('input[type=email]');
   }

   get nextButton() {
      return $('#identifierNext > div > button');
   }
   get loginButton() {
      return $('#passwordNext > div > button')
   }

   setEmail(emailAddress) {
      this.emailInputField.setValue(emailAddress);
   }

   clickNextButton() {
      this.nextButton.click();
   }
   clickLoginButton() {
      this.loginButton.click();
   }

   get passwordInputField() {
      return $('input[type=password]');
   }
   get hiddenPassword() {
      return $('[name=hiddenPassword]');
   }

   setPassword(password) {
      this.passwordInputField.waitForExist();
      this.passwordInputField.setValue(password);
   }
   waitForPasswordFieldToLoad() {
      this.hiddenPassword.waitForExist({ reverse: true })
   }

}

export default new GoogleLogin();