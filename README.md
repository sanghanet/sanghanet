# sanghanet

# initial setup
 1. clone repo

 2. run `npm install` in client folder
    run `npm install` in server folder
    run `npm install` in root folder to get eslint and its dependencies. (Also add/enable eslint extension in VsCode.)

 3. create .env.local / .env.atlas / .env.???? files accordig to your need in server directory.
   Example of .env.local:

      DB_URL=mongodb://localhost:test/27017

      PORT=4000

   When setting up env.atlas:

      Use DB_URL: mongodb+srv://<username>:<password>@cluster0-deyq5.gcp.mongodb.net/test?retryWrites=true&w=majority

      Your access has to be set up and your IP whitelisted before you can remotely connect using above URL.

   Since .env files will contain 'secrets' as well, NEVER push them into git repositories.
   Manage them on your computer only..

 4. If you would like to start the front-end + dev server, run `npm start` in the client directory.

 5. If you would like to start the back-end server with local db, run `npm run start-local` in the server directory.
    Feel free to config other .env files and start scripts...

    NOTE: for Windows users, with bash as their shell for npm scripts:
        edit your '.npmrc' config file (ususally in C:\Users\[username] folder) and set bash as 'shell' & 'script-shell'
        for example:
            shell=E:\Dev\Tools\PortableGit\bin\bash.exe
            script-shell=E:\Dev\Tools\PortableGit\bin\bash.exe

# test deployment

   1. use the `npm run-script build` in the client folder
      NOTE: this script will delete the contents of the /client/build and /server/app folders, then deploy the app in the /client/build folder and finally will copy it's contents to the /server/app folder.  

   The production build is now hosted on the backend server.
