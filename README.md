# initial setup
 1. clone repo

 1. run `npm install` in client folder
    run `npm install` in server folder
    run `npm install` in root directory to get eslint and its dependencies. (Also add/enable eslint extension in VsCode.)
    run `./installGitHooks.sh` in the root directory to install git hooks

 1. create .env.local / .env.atlas / .env.???? files accordig to your need in server directory.
   Example of .env.local:
```
      DEV_SERVER = 1
      DB_URL=mongodb://localhost:test/27017
      PORT=4000
      CLIENT_ID=55347337253-aglrjccot9o1n7s2caborv6gnee634pf.apps.googleusercontent.com
      CLIENT_SECRET = <???>

      SESSION_SECRET = <???>
```
   *If you would use client as a production build without a front-end dev-server,*
   *set DEV_SERVER = 0*

   *This CLIENT_ID is valid for localhost only.*
   *For deployment you will need a different value for the CLIENT_ID.*

   > When setting up env.atlas:

      Use DB_URL = mongodb+srv://<username>:<password>@cluster0-deyq5.gcp.mongodb.net/test?retryWrites=true&w=majority
      Your access has to be set up and your IP whitelisted before you can remotely connect using above URL.

   > Since .env files will contain 'secrets' as well, NEVER push them into git repositories.
   > Manage them on your computer only.

   WARNING! - Currently, if the DB_NAME and COLL_NAME local variables are not matching any database and collection in your mongo cluster, no error is thrown but functionality will be lost. Consider that as possible cause when debugging.

# Note for Windows users
   with bash as their shell for npm scripts:
   edit your '.npmrc' config file (ususally in C:\Users\[username] folder) and set bash as 'shell' & 'script-shell'

   for example:
   * shell=E:\Dev\Tools\PortableGit\bin\bash.exe
   * script-shell=E:\Dev\Tools\PortableGit\bin\bash.exe

# start the system
## Manual (legacy) mode
   1. If you would like to start the front-end + dev server, run `npm start` in the client directory.
   1. If you would like to start the back-end server with local db, run `npm run dev-local` in the server directory.

   Feel free to config other .env files and start scripts...

## Automatic mode (recommended)
**With local DB (recommended)**
If `mongod` daemon/service already running on localhost, run `npm run dev-local` in the root directory.

**With atlas DB**
run `npm run dev` in the root directory.


### Description
**The `npm run dev` command will:**
   - set DEV_SERVER variable to 1
   - start client dev server and atlas backend server concurrently


   *To stop the processes anytime, press CTRL-C.*
   *On WINDOWS also run `npm run killnode` to stop execution, because CTRL-C does not release port 4000 (EADDRINUSE :::4000)*

   Alternatively you can run `npm run build` in the root directory. This command will:

      - set DEV_SERVER variable to 0
      - run client build and copy to server
      - run backend atlas server

# test build
   Run the `npm run-script build` in the client folder.

   *The production build is now hosted on the backend server.*

### Note
   This script will delete the contents of the /client/build and /server/app folders, then deploy the app in the /client/build folder and finally will copy it's contents to the /server/app folder.

# manual deployment

Run `npm run deploy` script from the root directory. The script build the product, and copy all necessary files - and modify them - in separate folders for HEROKU and AZURE deployment as well.

**deployment on HEROKU**

 Heroku deployment works with a git repo, so create one as decribed below, and commit all files.
 > NOTE: need to install heroku cli npm package before first deploy. `??? npm install heroku -g ???`

 1. First cd to ../deployment/heroku folder. This is the home folder of HEROKU deploy.

    * `git init`
    * `git add .`
    * `git commit -m 'Deploy on Heroku'`

 1. Then Login to Heroku (user & pwd: our test user credentials)
    *  `heroku login`
    *  `heroku apps:destroy sanghanet --confirm sanghanet`
    *  `heroku apps:create sanghanet --region eu`
    *  `git push heroku master` => the URL here must be: https://sanghanet.herokuapp.com
    *  `heroku logs` => to get logs

**deployment on AZURE**

 Firebase deployment is based on 2 separate project (React frontend + Node.js REST backend).
 >NOTE: Easy way, use VSCode/Codium + Azure App Service extension!

 1. Start VSCode/Codium in ../deployment/azure folder!
 1. In Azure: App Service, delete `Free Trial > sanghanet` if exists.
 1. RIGHT mouse click on `Free Trial` and `Create New Web App...`
    * if you are not logged in to Azure, login as prompted (user & pwd: our test user credentials)
    * add webapp name: `sanghanet` (if the name is not correct, the routing will not work!)
    * select node version: `Node 12 LTS`
 1. Creation starting, check `OUTPUT` next to `TERMINAL aka. cli` window
 1. When creation is done, click `Deploy`
 1. When deployment is completed, check `https://sanghanet.azurewebsites.net/` is UP and RUNNING.
 1. \o/


# wipe and re-build finance accounts
Run `npm run buildfinance` in the root directory.
## description
   You can wipe and re-build the exising finance accounts for all members by using this command.
   This functionality is intended to facilitate re-population of the finance accounts in case a change is needed in the account models.
   It uses the Finance and Transaction models in the server/src/models directory.

# wipe and re-build the database
## description
   This action will first delete every document and collection from the database. Next, it will rebuild the 'members' collection with the data found in [members.json](./server/testDataScripts/members.json). After that, it will generate a finance transaction history with random numbers for each member by calling the command described above.
## guide
   Run [rebuildDB.sh](./server/testDataScripts/rebuildDB.sh) with a `local` or `atlas` parameter depending on which database you would like to reset. WARNING: using the `atlas` parameter will delete all reset that the deployed app is depending on.

   For those who like to copy and paste:
   run `cd ./server/testDataScripts && ./rebuildDB.sh local` in the root directory for a local reset
   run `cd ./server/testDataScripts && ./rebuildDB.sh atlas` in the root directory for an atlas reset - PROCEED WITH CAUTION
