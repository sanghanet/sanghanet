import BasePersonalInfo from "./BasePersonalInfo";
class LoginPage extends BasePersonalInfo {
   get loginButton() {
      return $(".login-btn");
   }

   open() {
      browser.url("http://localhost:3000");
   }

   clickLoginButton() {
      this.loginButton.click();
   }
}

export default new LoginPage();

