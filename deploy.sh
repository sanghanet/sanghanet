#!/usr/bin/env bash

DEPLOYMENT_ROOT=../deployment
BUILD=_build_
HEROKU=heroku
AZURE=azure
LIVE_DB_CREDENTIALS="server/.env.live"

echo "===> Delete Artifacts and old deployment files."
rm -rf $DEPLOYMENT_ROOT
rm -rf server/build
rm -rf server/app

echo "===> Compiling optimized React build for HEROKU & AZURE deployment"
cd client
npm run build
cd ..

echo "===> Compiling server build from typescript"
./syncCommonTypes.sh
cd server
node_modules/.bin/tsc
cd ..

echo "===> Copy server and app directory into deployment's build directory -outside GIT repository"
mkdir -p $DEPLOYMENT_ROOT/$BUILD
cp -r server/. $DEPLOYMENT_ROOT/$BUILD
mv $DEPLOYMENT_ROOT/$BUILD/build $DEPLOYMENT_ROOT/$BUILD/server

echo "===> Cleaning deployment's build directory"
rm -rf $DEPLOYMENT_ROOT/$BUILD/src
rm -rf $DEPLOYMENT_ROOT/$BUILD/node_modules
rm -rf $DEPLOYMENT_ROOT/$BUILD/testDataScripts
rm -rf $DEPLOYMENT_ROOT/$BUILD/logs/*
rm -rf $DEPLOYMENT_ROOT/$BUILD/.env.local
rm -rf $DEPLOYMENT_ROOT/$BUILD/.env.live
rm -rf $DEPLOYMENT_ROOT/$BUILD/.eslintrc.json
rm -rf $DEPLOYMENT_ROOT/$BUILD/tsconfig.json

echo "===> Tweak package.json"
sed -i 's/build\/server.js/server\/server.js/' $DEPLOYMENT_ROOT/$BUILD/package.json

echo "===> Tweak deployment's build .env.atlas config"
sed -i 's/DEV_SERVER.*/DEV_SERVER = 0/' $DEPLOYMENT_ROOT/$BUILD/.env.atlas

echo "===> Make Heroku customization and set application URL to sanghanet.herokuapp.com in server.js"
cp -r $DEPLOYMENT_ROOT/$BUILD $DEPLOYMENT_ROOT/$HEROKU
cp -r deployment/heroku/Procfile $DEPLOYMENT_ROOT/$HEROKU
sed -i 's/http:\/\/localhost:${PORT}/https:\/\/sanghanet.herokuapp.com/g' $DEPLOYMENT_ROOT/$HEROKU/server/controllers/passport.controller.js
sed -i 's/http:\/\/localhost:${APP_PORT}/https:\/\/sanghanet.herokuapp.com/g' $DEPLOYMENT_ROOT/$HEROKU/server/routers/auth.router.js

if [[ -f $LIVE_DB_CREDENTIALS ]]
then
    echo "===> Make Azure customization: set application URL to sanghanet.azurewebsites.net in server.js"
    cp -r $DEPLOYMENT_ROOT/$BUILD $DEPLOYMENT_ROOT/$AZURE
    cp -r deployment/azure/.vscode $DEPLOYMENT_ROOT/$AZURE
    sed -i 's/http:\/\/localhost:${PORT}/https:\/\/sanghanet.azurewebsites.net/g' $DEPLOYMENT_ROOT/$AZURE/server/controllers/passport.controller.js
    sed -i 's/http:\/\/localhost:${APP_PORT}/https:\/\/sanghanet.azurewebsites.net/g' $DEPLOYMENT_ROOT/$AZURE/server/routers/auth.router.js

    . $LIVE_DB_CREDENTIALS
    echo "===> Make Azure customization: set DB credentials"
    sed -i "s/sanghanet/$DB_NAME/" $DEPLOYMENT_ROOT/$AZURE/.env.atlas
    sed -i "s/:\/\/.*\@/:\/\/$USER_CREDENTIALS\@/" $DEPLOYMENT_ROOT/$AZURE/.env.atlas

    echo "======> Download images from Azure"
    rm -rf $DEPLOYMENT_ROOT/$AZURE/app/images/*
    cd $DEPLOYMENT_ROOT/$AZURE/app/images
    wget https://sanghanet.azurewebsites.net/images/list
    sed -i -e 's/^/http:\/\/sanghanet.azurewebsites.net\/images\//' list
    wget -i list
    rm list
    if [[ ! -f noAvatar.svg ]]
    then
        cp -r ../../../$BUILD/app/images/noAvatar.svg ./
    fi
    cd -
    echo
    echo "AZURE build is ready for manual deployment from: " $DEPLOYMENT_ROOT/$AZURE
else
    rm -rf $DEPLOYMENT_ROOT/$AZURE
    echo
    echo "AZURE build is NOT POSSIBLE. MISSING file: "$LIVE_DB_CREDENTIALS
fi

echo "HEROKU build is ready for manual deployment from: " $DEPLOYMENT_ROOT/$HEROKU

