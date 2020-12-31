
import { mongoose } from '../../../../server/src/controllers/mongoDB.controller';

import { Member } from '../../../../server/src/models/member.model';
import { RegisteredUser } from '../../../../server/src/models/registered.user.model';
import { initDBConnection } from '../../../../server/src/controllers/mongoDB.controller';
import LoginPage from '../page-objects/Login.page';
import GoogleLogin from '../page-objects/GoogleLogin.page';

const user = ["Teszt Elek", "userforsangha@gmail.com", false, true, false, false, false, ""]

const createMember = (label, email, isSuperuser, isFinanceAdmin, isEventAdmin, isYogaAdmin, level) => {
   return Member.create({
      label,
      email,
      isSuperuser,
      isFinanceAdmin,
      isEventAdmin,
      isYogaAdmin,
      level
   });
};

describe("Something will happen", () => {
   beforeAll(() => {
      initDBConnection();
      const data = browser.call(() => createMember(...user));
      console.log(data);
      mongoose.disconnect();
   })

   it("Should", () => {
      LoginPage.open();
      LoginPage.clickLoginButton();

      GoogleLogin.setEmail('userforsangha@gmail.com');

      GoogleLogin.clickNextButton();
      GoogleLogin.waitForPasswordFieldToLoad();


      GoogleLogin.setPassword('newUser1234')
      GoogleLogin.clickLoginButton();
      browser.debug()
   })
})