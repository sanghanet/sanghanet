#!/usr/bin/env bash

DEPLOYMENT_ROOT=../deployment
SANGHANET=sanghanet
SANGHANETLIVE=sanghanetlive

echo "Remove old builds, and prepare folder structure."
rm -rf $DEPLOYMENT_ROOT
mkdir -p $DEPLOYMENT_ROOT
mkdir -p $DEPLOYMENT_ROOT/$SANGHANET
mkdir $DEPLOYMENT_ROOT/$SANGHANETLIVE

echo "Prepare React production build for Sanghanet"
cd client
git clean -fX public/images/ # remove test images w/ random names
# FILES=`grep -rl "http://localhost:" ./src`
# echo $FILES | xargs sed -i 's/http:\/\/localhost:[0-9]*/https:\/\/sanghanet.herokuapp.com/g'
npm run build
mv build ../$DEPLOYMENT_ROOT/$SANGHANET/app
# echo $FILES | xargs git checkout
cd ..

echo "Copy node.js backend and tweak .env.atlas"
mkdir $DEPLOYMENT_ROOT/backend
mkdir $DEPLOYMENT_ROOT/backend/logs
cp server/.env.atlas $DEPLOYMENT_ROOT/backend/
cp server/package* $DEPLOYMENT_ROOT/backend/
cp -r server/src/ $DEPLOYMENT_ROOT/backend/src
cp server/Procfile $DEPLOYMENT_ROOT/$SANGHANET
sed -i 's/DEV_SERVER.*/DEV_SERVER = 0/' $DEPLOYMENT_ROOT/backend/.env.atlas

echo "Prepare Node.js backend for Heroku deployment"
cd $DEPLOYMENT_ROOT/$SANGHANET
cp -rT ../backend ./
sed -i 's/PORT.*/PORT = process.env.PORT/' .env.atlas
sed -i 's/http:\/\/localhost:${PORT}/https:\/\/sanghanet.herokuapp.com/g' src/controllers/passport.controller.js
sed -i 's/http:\/\/localhost:${APP_PORT}/https:\/\/sanghanet.herokuapp.com/g' src/routers/auth.router.js
cd -

echo "SanghaNet build is ready for manual deployment to Heroku from: " $DEPLOYMENT_ROOT/$SANGHANET