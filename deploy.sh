#!/usr/bin/env bash

DEPLOYMENT_ROOT=../deployment
BUILD=_build_
HEROKU=heroku
AZURE=azure

echo "===> Compiling optimized React build for HEROKU & AZURE deployment"
cd client
npm run build
cd ..

echo "===> Copy server directory into deployment's build directory -outside GIT repository"
rm -rf $DEPLOYMENT_ROOT
mkdir -p $DEPLOYMENT_ROOT/$BUILD
cp -r server/. $DEPLOYMENT_ROOT/$BUILD

echo "===> Cleaning deployment's build directory"
rm -rf $DEPLOYMENT_ROOT/$BUILD/logs/*
rm -rf $DEPLOYMENT_ROOT/$BUILD/testDataScripts
rm -rf $DEPLOYMENT_ROOT/$BUILD/.env.local
rm -rf $DEPLOYMENT_ROOT/$BUILD/node_modules

echo "===> Tweak deployment's build .env.atlas config"
sed -i 's/DEV_SERVER.*/DEV_SERVER = 0/' $DEPLOYMENT_ROOT/$BUILD/.env.atlas

echo "===> Make Heroku customization and set application URL to sanghanet.herokuapp.com in server.js"
cp -r $DEPLOYMENT_ROOT/$BUILD $DEPLOYMENT_ROOT/$HEROKU
cp -r deployment/heroku/Procfile $DEPLOYMENT_ROOT/$HEROKU
sed -i 's/http:\/\/localhost:${PORT}/https:\/\/sanghanet.herokuapp.com/g' $DEPLOYMENT_ROOT/$HEROKU/src/controllers/passport.controller.js
sed -i 's/http:\/\/localhost:${APP_PORT}/https:\/\/sanghanet.herokuapp.com/g' $DEPLOYMENT_ROOT/$HEROKU/src/routers/auth.router.js

echo "===> Make Azure customization and set application URL to sanghanet.azurewebsites.net in server.js"
cp -r $DEPLOYMENT_ROOT/$BUILD $DEPLOYMENT_ROOT/$AZURE
cp -r deployment/azure/.vscode $DEPLOYMENT_ROOT/$AZURE
sed -i 's/http:\/\/localhost:${PORT}/https:\/\/sanghanet.azurewebsites.net/g' $DEPLOYMENT_ROOT/$AZURE/src/controllers/passport.controller.js
sed -i 's/http:\/\/localhost:${APP_PORT}/https:\/\/sanghanet.azurewebsites.net/g' $DEPLOYMENT_ROOT/$AZURE/src/routers/auth.router.js

echo
echo "HEROKU build is ready for manual deployment from: " $DEPLOYMENT_ROOT/$HEROKU
echo "AZURE build is ready for manual deployment from: " $DEPLOYMENT_ROOT/$AZURE
