# sanghanet

# initial setup
 1. clone repo

 2. run `npm install` in client folder
    run `npm install` in server folder
    run `npm install` in root folder to get eslint and It's dependencies. (Also add/enable eslint extension in VsCode.)

 3. in order to start both the backend and the frontend + dev server, use `npm run-script startBoth` in the client directory.

    If you would like to start the front-end + dev server only, run `npm start` in the client directory.
    If you would like to start the back-end server only, run `npm start` in the server directory.

# test deployment

   1. use the `npm run-script build` in the client folder
   2. copy the contents of the build folder to the app folder in the server.
      `$ cp -r  build/* ../server/app`

   The production build is now hosted on the backend server.
