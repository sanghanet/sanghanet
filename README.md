# sanghanet

# initial setup
 1. clone repo

 2. run `npm install` in client folder
    run `npm install` in server folder
    run `npm install` in root folder to get eslint and its dependencies. (Also add/enable eslint extension in VsCode.)

 3. create .env.local / .env.atlas / .env.???? files accordig to your need in server directory.
   Example of .env.local:

      DB_URL=localhost
      DB_NAME=test
      DB_PORT=27017

      PORT=4000

   Since .env files will contains 'secrets' as well, NEVER push them into git repositories.
   Manage them on your computer only..

 4. If you would like to start the front-end + dev server, run `npm start` in the client directory.

 5. If you would like to start the back-end server in local db, run `npm run start-local` in the server directory. Feel free to config other .env files and start scripts...

# test deployment

   1. use the `npm run-script build` in the client folder
   2. copy the contents of the build folder to the app folder in the server.
      `$ cp -r  build/* ../server/app`

   The production build is now hosted on the backend server.
