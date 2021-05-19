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

Make sure you have `wget` installed on your computer.
On Mac you can check that by typing `brew ls --versions wget`. On other systems try to use `wget -v`.
If you don't have it installed:
 - run `brew install wget` on macOS in your terminal
 - follow [these steps](https://www.addictivetips.com/windows-tips/install-and-use-wget-in-windows-10/) to install wget on windows
 - on Linux use the `sudo apt-get install wget` command

Run `npm run deploy` script from the root directory. The script build the product, and copy all necessary files - and modify them - in separate folders for HEROKU and AZURE deployment as well. The script also download the active profile images from Azure. These images will be restored during deployment. (No image save&restore on Heroku!)

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

**deployment on AZURE aka. LIVE DEPLOYMENT**

 Azure deployment is based on 2 separate project (React frontend + Node.js REST backend).

 >NOTE: Use VSCode/Codium and its Azure App Service extension for the following steps!

 >NOTE: server/.env.live configuration MUST exists, otherwise azure build will be skipped.
 1. Start VSCode/Codium in ../deployment/azure folder!
 1. In Azure: App Service, delete `Sanghanet Azure subscription > sanghanet` if exists.
 ( If you are not logged in to Azure, press CTRL-SHFT-P, and select Azure: Sign In. )
 1. RIGHT mouse click on `Sanghanet Azure subscription` and `Create New Web App...`
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

#
# ESlint config
- No global lint or plugins/extensions are necessary.
- No lint or plugins/extensions installed in the root folder anymore.
- 'server' folder and 'client' folder contains 1-1 lint and all necessay plugins/extensions and the config as well.
- To render lint errors and warning on the browser, disable(or comment out) ENV variable `ESLINT_NO_DEV_ERRORS` in client/.env file.

## Manual lint execution
    $ server/node_modules/.bin/eslint server

    $ client/node_modules/.bin/eslint client

## Automatic lint execution in VSCode(ium):
    Reset former eslint config: CTRL-SHIFT-P + select Eslint: reset library decision
    When editor ask which lint config to be used, select Allow.

    Correct ESlint load messages in the OUTPUT tab (if One need to debug lint config):
        [Info - 10:10:50 PM] ESLint server stopped.
        [Info - 10:10:52 PM] ESLint server running in node v12.18.3
        [Info - 10:10:52 PM] ESLint server is running.
        [Info - 10:10:53 PM] ESLint library loaded from: E:\Dev\web\sanghanet\server\node_modules\eslint\lib\api.js
        [Info - 10:11:03 PM] ESLint library loaded from: E:\Dev\web\sanghanet\client\node_modules\eslint\lib\api.js


# Symlinks for common types:
   Always modify commonTypes/type.d.ts.
   Client and Server going to use the same file through types/symlink-to-type.d.ts

## Enable Symlinks for common types:
   `git config --global core.symlinks true`

## Create new symlinks (tested on Linux only):
   - Create common type in commonTypes folder.
   - `cd client/src/types && ln -s ../../../commonTypes/test.d.ts test.d.ts`
   - `cd server/src/types && ln -s ../../../commonTypes/test.d.ts test.d.ts`

