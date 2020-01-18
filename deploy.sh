#!/usr/bin/env bash

DEPLOY_DIR=../deploy/sanghanet

echo "1) building the project"
cd client
npm run build
cd ..

echo "2) copy server directory in a separate git directory"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR
cp -r server/. $DEPLOY_DIR

echo "3) cleaning directories"
rm -rf $DEPLOY_DIR/logs/*
rm -rf $DEPLOY_DIR/node_modules/

echo "4) tweak .env config"
sed -i 's/DEV_SERVER.*/DEV_SERVER = 0/' $DEPLOY_DIR/.env.atlas
sed -i 's/PORT.*/PORT = process.env.PORT/' $DEPLOY_DIR/.env.atlas

echo "SanghaNet build is ready for manual deployment to Heroku from " $DEPLOY_DIR
